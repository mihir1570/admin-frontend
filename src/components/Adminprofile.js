import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Login from "./Login";
import { Container, Typography, TextField, Button, Grid, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BASE_URL from './config';


const Adminprofile = () => {
    const auth = localStorage.getItem("adminLogin");
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        companyName: '',
        companyAddress: ''
    });

    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [editedValue, setEditedValue] = useState('');
    const [editedFieldName, setEditedFieldName] = useState('');


    useEffect(() => {
        if (auth) {
            updateAdminProfile();
        }
    }, [])

    const updateAdminProfile = async () => {
        const jsonData = JSON.parse(auth)
        setFormData({
            firstName: jsonData.firstName,
            lastName: jsonData.lastName,
            email: jsonData.email,
            phone: jsonData.phoneNumber,
            companyName: jsonData.companyName,
            companyAddress: jsonData.companyAddress
        })
    }



    const handleEditDialogOpen = (fieldName, fieldValue) => {
        setOpenEditDialog(true);
        setEditedValue(fieldValue);
        setEditedFieldName(fieldName);
    };

    const handleEditDialogClose = () => {
        setOpenEditDialog(false);
    };

    const handleInputChange = (e) => {
        setEditedValue(e.target.value);
    };

    const handleFieldUpdate = () => {
        setFormData(prevState => ({
            ...prevState,
            [editedFieldName]: editedValue
        }));
        handleEditDialogClose();
    };

    return (
        <>
            {auth ?
                <>
                    <Sidebar />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 admin-profile">
                        <Container maxWidth="md">
                            <Card className="custom-card">
                                <CardContent>
                                    <Typography variant="h4" gutterBottom align="center">
                                        Profile
                                    </Typography>
                                    <Typography variant="subtitle1" gutterBottom align="center">
                                        Update your profile information below.
                                    </Typography>
                                    <form>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    label="First Name"
                                                    variant="outlined"
                                                    fullWidth
                                                    name="firstName"
                                                    multiline
                                                    value={formData.firstName}
                                                    onClick={() => handleEditDialogOpen('firstName', formData.firstName)}
                                                    InputProps={{
                                                        endAdornment: <PersonIcon />,
                                                        readOnly: true
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    label="Last Name"
                                                    variant="outlined"
                                                    fullWidth
                                                    name="lastName"
                                                    multiline
                                                    value={formData.lastName}
                                                    onClick={() => handleEditDialogOpen('lastName', formData.lastName)}
                                                    InputProps={{
                                                        endAdornment: <PersonIcon />,
                                                        readOnly: true
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    label="Email"
                                                    variant="outlined"
                                                    fullWidth
                                                    name="email"
                                                    multiline
                                                    value={formData.email}
                                                    onClick={() => handleEditDialogOpen('email', formData.email)}
                                                    InputProps={{
                                                        endAdornment: <EmailIcon />,
                                                        readOnly: true
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    label="Phone"
                                                    variant="outlined"
                                                    fullWidth
                                                    name="phone"
                                                    multiline
                                                    value={formData.phone}
                                                    onClick={() => handleEditDialogOpen('phone', formData.phone)}
                                                    InputProps={{
                                                        endAdornment: <PhoneIcon />,
                                                        readOnly: true
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    label="Company Name"
                                                    variant="outlined"
                                                    fullWidth
                                                    multiline
                                                    name="companyName"
                                                    value={formData.companyName}
                                                    onClick={() => handleEditDialogOpen('companyName', formData.companyName)}
                                                    InputProps={{
                                                        endAdornment: <BusinessIcon />,
                                                        readOnly: true
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    label="Company Address"
                                                    variant="outlined"
                                                    fullWidth
                                                    multiline
                                                    name="companyAddress"
                                                    value={formData.companyAddress}
                                                    onClick={() => handleEditDialogOpen('companyAddress', formData.companyAddress)}
                                                    InputProps={{
                                                        endAdornment: <LocationOnIcon />,
                                                        readOnly: true
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </form>
                                </CardContent>
                            </Card>
                        </Container>


                        <Dialog open={openEditDialog} onClose={handleEditDialogClose} className="edit-dialog" sx={{ width: '500px', maxWidth: '90%', margin: 'auto' }}>
                            <DialogTitle>Edit {editedFieldName}</DialogTitle>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    label={editedFieldName}
                                    fullWidth
                                    multiline
                                    value={editedValue}
                                    onChange={handleInputChange}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleEditDialogClose} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={handleFieldUpdate} color="primary">
                                    Update
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </main>

                </>
                :
                <Login />
            }
        </>
    );
};

export default Adminprofile;

