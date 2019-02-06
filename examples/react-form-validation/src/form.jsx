import React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CardHeader from "@material-ui/core/CardHeader";
import { CardActions } from "@material-ui/core";
import Button from '@material-ui/core/Button';

const From = ({
    firstName,
    lastName,
    username,
    email,
    password,
    cPassword,
    errors,
    handleChange,
    handleSubmit
})=> (
     <Grid container justify="center">
        <Grid item xs={12} sm={10} md={5}>
        <Card>
            <CardHeader title="Register" />
            <CardContent>
            <TextField
                id="outlined-name"
                label="FirstName"
                value={firstName}
                onChange={handleChange}
                error={errors.firstName}
                margin="normal"
                fullWidth
                variant="outlined"
            />
            <TextField
                id="outlined-name"
                label="LastName"
                value={lastName}
                onChange={handleChange}
                error={errors.lastName}
                margin="normal"
                fullWidth
                variant="outlined"
            />
            <TextField
                id="outlined-name"
                label="Username"
                value={username}
                onChange={handleChange}
                error={errors.username}
                margin="normal"
                fullWidth
                variant="outlined"
            />
            <TextField
                id="outlined-name"
                label="Email"
                value={email}
                onChange={handleChange}
                error={errors.email}
                margin="normal"
                fullWidth
                variant="outlined"
            />
            <TextField
                id="outlined-name"
                label="Password"
                value={password}
                onChange={handleChange}
                error={errors.password}
                margin="normal"
                fullWidth
                variant="outlined"
            />
            <TextField
                id="outlined-name"
                label="Password Confirmation"
                value={cPassword}
                onChange={handleChange}
                error={errors.cPassword}
                margin="normal"
                fullWidth
                variant="outlined"
            />
            </CardContent>
            <CardActions>
            <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                Submit
            </Button>
            </CardActions>
        </Card>
        </Grid>
    </Grid>
)

export default From;