import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useSettings } from '../context/SettingsContext';
import HarvestLoadFormBody from "./HarvestLoadFormBody";

const defaultForm = {
  uid: '',
  Date_Received: '',
  WO: '',
  Block: '',
  Vintrace_ST: '',
  Tons: '',
  Crush_Pad: "White Crush Pad",
};

export default function AddEditHarvestLoadForm({ show, onClose, onSubmit, initialData, mode }) {
  const { settings } = useSettings();
  const visible = settings.harvestLoadForm.fields;

  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData && mode === 'edit') {
      setForm(initialData);
    } else {
      setForm(defaultForm);
    }
  }, [show, initialData, mode]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Validate required visible fields only
      const required = Object.keys(visible).filter(f => visible[f]);
      for (let f of required) if (!form[f]) throw new Error(`Missing field: ${f}`);
      await onSubmit(form);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to submit');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal show={show} onHide={onClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{mode === 'add' ? 'Add Harvest Load' : 'Edit Harvest Load'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <HarvestLoadFormBody
            form={form}
            visible={visible}
            handleChange={handleChange}
            mode={mode}
            error={error}
            disableAll={false}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? <Spinner size="sm" /> : (mode === 'add' ? 'Add' : 'Save')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

AddEditHarvestLoadForm.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.object,
  mode: PropTypes.oneOf(['add', 'edit']).isRequired
};
