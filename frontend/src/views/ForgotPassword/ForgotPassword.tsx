import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "../../components/Card/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import InputField from "../../components/InputField/InputField";
import Grid from "@material-ui/core/Grid";
import Button from "../../components/Button/Button";
import useForm from "../../service/Form/useForm";
import validateSignUp from "../../service/Form/Validate";
import Authentication from "../../service/Authentication";

const useStyles = makeStyles({
    grid: {
        maxWidth: "450px",
        minWidth: "250px"
    },

    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)"
    },
    title: {
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "20px"
    },
    pos: {
        marginBottom: 12
    },
    notchedOutline: {
        borderRadius: 0
    }
});

export default (props: any) => {
    const classes = useStyles(props);

    const { handleChange, handleSubmit, values, errors } = useForm(
        submit,
        {
            password: "",
            passwordConfirmed: "",
        },
        validateSignUp
    );

    function submit() {

        if(values.password) {
            console.log("Submitted form");
            Authentication.changePasswordForgot(
                {
                new_password: values.password,
                token: props.match.params.token
                }
            ).catch((error: any) => console.log(props.match.params.token));
        }
    }

    return (
        <Card width={"80%"} style={{ minWidth: "250px", maxWidth: "450px" }}>
            <Grid container className={classes.grid}>
                <CardContent>
                    <Grid container justify="center" direction="row">
                        <Typography className={classes.title} variant="h3" align="center">
                            Change Password
                        </Typography>
                    </Grid>
                    <form onSubmit={handleSubmit} noValidate>
                        {errors.password && <Typography>{errors.password}</Typography>}
                        <InputField
                            name="password"
                            label="Password"
                            autoComplete="current-password"
                            value={values.password}
                            onChange={handleChange}
                        />
                        {errors.passwordConfirmed && (
                            <Typography>{errors.passwordConfirmed}</Typography>
                        )}

                        <InputField
                            name="passwordConfirmed"
                            label="Password"
                            autoComplete="current-password"
                            value={values.passwordConfirmed}
                            onChange={handleChange}
                        />
                        <Grid container direction="row" justify="space-between">
                            <Button type="submit">Confirm</Button>
                        </Grid>
                    </form>
                </CardContent>
            </Grid>
        </Card>
    );
};
