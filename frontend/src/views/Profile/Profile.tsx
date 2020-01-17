import React, { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Tabs,
  Tab,
  Box
} from "@material-ui/core";
import InputField from "../../components/InputField/InputField";
import UserService from "../../service/users";
import RoleService from "../../service/roles";
import getCookie from "../../service/cookie";
import MyEvents from "./MyEvents";
import EventService from "../../service/events";
import FileService from "../../service/files"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontSize: "24px",
      padding: "20px"
    },
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "left",
      color: theme.palette.text.secondary,
      width: "500px"
    },
    editPic: {
      fontSize: "12px",
      "&:hover": {
        cursor: "pointer",
      }
    }
  })
);

export default (props: any) => {
  const classes = useStyles();
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openChangePass, setOpenChangePass] = React.useState(false);
  const [openEditPic, setOpenEditPic] = React.useState(false);
  const [value, setValue] = React.useState(0);

  const handleChangeTabs = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const [pic_url, setPic_url] = useState("")
  const [file, setFile] = useState(new File(["foo"], ""))
  const [newValues, setNewValues] = useState({
    fullName: "hei",
    email: "email",
    telephone: "telephone",
    picture: ""
  });
  const [values, setValues] = useState({
    id: 0,
    fullName: "hei",
    roleID: 0,
    role: "role",
    email: "email",
    telephone: "telephone",
    picture: ""
  });
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setNewValues({ ...newValues, [name]: value });
  };

  const handleSubmitData = (event: any) => {
    setValues({
      fullName: newValues.fullName,
      email: newValues.email,
      telephone: newValues.telephone,
      id: values.id,
      roleID: values.roleID,
      role: values.role,
      picture: values.picture
    });
    UserService.updateOneUser(values.id, {
      username: newValues.fullName,
      email: newValues.email,
      phone: newValues.telephone,
      picture: newValues.picture
    }).then(res => console.log(res));
    setOpenEdit(false);
  };

  const fileSelectedHandler = (event: any) => {
    setFile(event.target.files[0])
  };
  const uploadProfilePicture = () => {
    return Promise.resolve(FileService.postProfilePicture(file))
  };

  const resetNewVal = () => {
    setNewValues({
      fullName: values.fullName,
      email: values.email,
      telephone: values.telephone,
      picture: values.picture
    });
  };

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    resetNewVal();
  };

  const handleOpenChangePass = () => {
    setOpenChangePass(true);
  };

  const handleCloseChangePass = () => {
    setOpenChangePass(false);
  };

  const handleOpenEditPic = () => {
    setOpenEditPic(true);
  };

  const handleCloseEditPic = () => {
    setOpenEditPic(false);
    setFile(new File(["foo"], ""))
    window.location.reload();  
  };

  useEffect(() => {
    UserService.getOneUser().then(res => {
      RoleService.getRole(res.roleID).then((res1: any) => {
        setValues({
          id: res.id,
          roleID: res.roleID,
          fullName: res.username,
          email: res.email,
          telephone: res.phone,
          role: res1.role_name,
          picture: res.picture
        });
        setNewValues({
          fullName: res.username,
          email: res.email,
          telephone: res.phone,
          picture: res.picture
        });
        setPic_url("http://localhost:8080/image/profile/" + res.id)
      });
    });
  }, []);

  const [events, setEvents] = useState<any>([]);

  useEffect(() => {
    EventService.getEventsByUser().then((response: any) => {
      if (response.length !== 0) {
        setEvents(response);
      }
    });
  }, []);

  function a11yProps(index: any) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`
    };
  }
  function TabPanel(props: any) {
    const { children, value, index, ...other } = props;

    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    );
  }

  return (
    <Card width={"100%"} style={{ minWidth: "500px", maxWidth: "800px" }}>
      <div>
        <Grid container direction="row">
          <Paper className={classes.root}>
            <Tabs
              value={value}
              onChange={handleChangeTabs}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="My profile" {...a11yProps(0)} />
              <Tab label="My events" {...a11yProps(1)} />
            </Tabs>
          </Paper>
        </Grid>
      </div>
      <TabPanel value={value} index={0}>
        <CardContent>
          <div style={{ marginBottom: "30px" }}>
            <Grid container spacing={4}>
              <Grid item xs={3}>
                <img
                  style={{ width: "160px", height: "160px" }}
                  src={pic_url}
                  alt={values.picture}
                />
                <Typography>
                  <Link
                    onClick={handleOpenEditPic}
                    color="inherit"
                    className={classes.editPic}
                  >
                    {"Edit profile picture"}
                  </Link>
                </Typography>
                <Dialog
                  open={openEditPic}
                  onClose={handleCloseEditPic}
                  aria-labelledby="form-dialog-title"
                  style={{ width: "100%" }}
                >
                  <DialogTitle id="form-dialog-title">
                    Edit Profile Picture
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText></DialogContentText>
                    <Paper className={classes.paper}>
                      <Grid container direction="row">
                        <Button variant="contained" component="label">
                          Choose File
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={fileSelectedHandler}
                          />
                        </Button>
                        <Typography style={{marginLeft: "30px"}}>
                          Chosen file: {file.name}
                        </Typography>
                      </Grid>
                    </Paper>
                  </DialogContent>
                  <DialogActions>
                    <Grid container direction="row" justify="center">
                      <Grid item xs={3}>
                        <Button type="submit" onClick={()=> {uploadProfilePicture().then(()=>{
                          handleCloseEditPic()
                          })}}>Upload Image</Button>
                      </Grid>
                      <Grid item xs={3}>
                        <Button onClick={handleCloseEditPic} color="primary">
                          Cancel
                        </Button>
                      </Grid>
                    </Grid>
                  </DialogActions>
                </Dialog>
              </Grid>
              <Grid item xs={3}>
                <p>{values.fullName}</p>
                <p>{values.role}</p>
                <p>{values.email}</p>
                <p>{values.telephone}</p>
              </Grid>
            </Grid>
          </div>
          <div>
            <Grid container direction="row" justify="center">
              <Grid item xs={3}>
                <Button onClick={handleOpenEdit}>Edit</Button>
                <Dialog
                  open={openEdit}
                  onClose={handleCloseEdit}
                  aria-labelledby="form-dialog-title"
                  style={{ width: "100%" }}
                >
                  <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
                  <DialogContent>
                    <DialogContentText></DialogContentText>
                    <InputField
                      autoFocus
                      name="fullName"
                      label="Name"
                      type="text"
                      value={newValues.fullName}
                      onChange={handleChange}
                    />
                    <InputField
                      autoFocus
                      name="email"
                      label="Email"
                      type="text"
                      value={newValues.email}
                      onChange={handleChange}
                    />
                    <InputField
                      autoFocus
                      name="telephone"
                      label="Telephone"
                      type="text"
                      value={newValues.telephone}
                      onChange={handleChange}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Grid container direction="row" justify="center">
                      <Grid item xs={3}>
                        <Button onClick={handleSubmitData} color="primary">
                          Save Profile
                        </Button>
                      </Grid>
                      <Grid item xs={3}>
                        <Button onClick={handleCloseEdit} color="primary">
                          Cancel
                        </Button>
                      </Grid>
                    </Grid>
                  </DialogActions>
                </Dialog>
              </Grid>
              <Grid item xs={3}>
                <Button onClick={handleOpenChangePass}>Change Password</Button>
                <Dialog
                  open={openChangePass}
                  onClose={handleCloseChangePass}
                  aria-labelledby="form-dialog-title"
                  style={{ width: "100%" }}
                >
                  <DialogTitle id="form-dialog-title">
                    Change PassWord
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText></DialogContentText>
                    <InputField
                      autoFocus
                      name="oldPassword"
                      label="Old Password"
                      type="text"
                      onChange={handleChange}
                    />
                    <InputField
                      autoFocus
                      name="newPassword"
                      label="New Password"
                      type="text"
                      onChange={handleChange}
                    />
                    <InputField
                      autoFocus
                      name="confirmPassword"
                      label="Confirm Password"
                      type="text"
                      onChange={handleChange}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Grid container direction="row" justify="center">
                      <Grid item xs={3}>
                        <Button color="primary">Change</Button>
                      </Grid>
                      <Grid item xs={3}>
                        <Button onClick={handleCloseChangePass} color="primary">
                          Cancel
                        </Button>
                      </Grid>
                    </Grid>
                  </DialogActions>
                </Dialog>
              </Grid>
              <Grid item xs={3}>
                <Button
                  onClick={() => {
                    document.cookie =
                      "token=" +
                      getCookie("token") +
                      "; expires=" +
                      new Date().toUTCString();
                    props.logFunc(false)
                    window.location.hash = "#/";
                  }}
                >
                  Logout
                </Button>
              </Grid>
            </Grid>
          </div>
        </CardContent>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CardContent>
          <div style={{ marginBottom: "30px" }}>
            <Grid container spacing={4}>
              <MyEvents events={events} />
            </Grid>
          </div>
        </CardContent>
      </TabPanel>
    </Card>
  );
};
