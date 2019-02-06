import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import CardHeader from "@material-ui/core/CardHeader";
import { CardActions } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const From = ({
	firstName,
	lastName,
	username,
	email,
	password,
	cPassword,
	errors,
	handleChange,
	handleSubmit,
	handleDirty
}) => (
	<Grid container justify="center">
		<Grid item xs={12} sm={10} md={5}>
			<Card>
				<CardHeader title="React From Validation Using V4F library" />
				<CardContent>
					<TextField
						label="FirstName"
						name="firstName"
						value={firstName}
						onChange={handleChange}
						onBlur={handleDirty}
						error={errors.firstName !== undefined}
						helperText={errors.firstName}
						margin="normal"
						fullWidth
						variant="outlined"
					/>
					<TextField
						label="LastName"
						name="lastName"
						value={lastName}
						onChange={handleChange}
						onBlur={handleDirty}
						error={errors.lastName !== undefined}
						helperText={errors.lastName}
						margin="normal"
						fullWidth
						variant="outlined"
					/>
					<TextField
						label="Username"
						name="username"
						value={username}
						onChange={handleChange}
						onBlur={handleDirty}
						error={errors.username !== undefined}
						helperText={errors.username}
						margin="normal"
						fullWidth
						variant="outlined"
					/>
					<TextField
						label="Email"
						name="email"
						value={email}
						onChange={handleChange}
						onBlur={handleDirty}
						error={errors.email !== undefined}
						helperText={errors.email}
						margin="normal"
						type="email"
						fullWidth
						variant="outlined"
					/>
					<TextField
						label="Password"
						name="password"
						value={password}
						onChange={handleChange}
						onBlur={handleDirty}
						error={errors.password !== undefined}
						helperText={errors.password}
						margin="normal"
						type="password"
						fullWidth
						variant="outlined"
					/>
					<TextField
						label="Password Confirmation"
						name="cPassword"
						value={cPassword}
						onChange={handleChange}
						onBlur={handleDirty}
						error={errors.cPassword !== undefined}
						helperText={errors.cPassword}
						margin="normal"
						type="password"
						fullWidth
						variant="outlined"
					/>
				</CardContent>
				<CardActions>
					<Button
						variant="contained"
						color="primary"
						fullWidth
						onClick={handleSubmit}
					>
						Submit
					</Button>
				</CardActions>
			</Card>
		</Grid>
	</Grid>
);

export default From;
