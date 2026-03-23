import React, { useState } from 'react'
import { Button, Form, FloatingLabel } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';
import { SPECIALIZATIONS } from '../../../components/constants/specializations'

const EditProfile = ({ DocData, show, handleClose }) => {
    
    const [ProfileEdit, setProfileEdit] = useState(DocData);
    const [doctorImage, setDoctorImage] = useState(null);

    const handleChange = (e) => {
        setProfileEdit({ ...ProfileEdit, [e.target.name]: e.target.value })
    }

    const handleImageChange = (e) => {
        setDoctorImage(e.target.files[0])
    }

    const handleSaveChanges = async (e) => {
        e.preventDefault()
        try {
            const newData = new FormData()
            newData.append('docname', ProfileEdit.name)
            newData.append('license', ProfileEdit.license)
            newData.append('qualification', ProfileEdit.qualification)
            newData.append('specialization', ProfileEdit.specialization)
            newData.append('address', ProfileEdit.address)
            newData.append('profileImage', doctorImage)

            const res = await axios.put(`${import.meta.env.VITE_HOST_URL}/api/doctor/edit-profile`, newData,
                { headers: { Authorization: `Bearer ${token}` } })

            if (res.status == 200) {
                toast.success(res.data.msg)
                handleClose()
                setTimeout(() => {
                    window.location.reload()
                }, 2000);
            } else {
                toast.error(res.data.msg)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong...')
        }
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>✏️ Edit your profile</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ background: 'rgba(143, 211, 229, 0.33)' }}>
                <Form>
                    <FloatingLabel controlId="floatingDocName" label="Doctor Name" className="mb-3">
                        <Form.Control type="text" name="name" value={ProfileEdit.name} onChange={handleChange} placeholder="Enter name" />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingLicense" label="Medical License Number" className="mb-3">
                        <Form.Control type="text" name="license" value={ProfileEdit.license} onChange={handleChange} placeholder="Enter Medical License Number" />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingQualification" label="Educational Qualification" className="mb-3">
                        <Form.Control type="text" name="qualification" value={ProfileEdit.qualification} onChange={handleChange} placeholder="Enter Educational Qualification" />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingSpecialization" label="Specialization" className="mb-3">
                        <Form.Select name="specialization" value={ProfileEdit.specialization} onChange={handleChange} required>
                            <option value="">-- Select Specialization --</option>
                            {SPECIALIZATIONS.map((spec) =>
                                <option value={spec} key={spec}> {spec} </option>
                            )}
                        </Form.Select> </FloatingLabel>

                    <FloatingLabel controlId="floatingDocAddress" label="Address" className="mb-3">
                        <Form.Control as="textarea" name="address" value={ProfileEdit.address} onChange={handleChange} style={{ height: '100px' }} placeholder="Enter address" />
                    </FloatingLabel>

                    <Form.Group className="mb-3">
                        <Form.Label>Current Profile Image:</Form.Label>
                        <div style={{ marginTop: '5px', marginLeft: '100px' }}>
                            <img
                                src={`${import.meta.env.VITE_HOST_URL}/uploads/${DocData.profileImage}`}
                                alt="Current Profile"
                                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                            />
                        </div>
                        <Form.Label className="mt-3">Upload a new image:</Form.Label>
                        <Form.Control type="file" onChange={handleImageChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSaveChanges}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditProfile