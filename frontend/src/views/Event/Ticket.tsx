import React, { constructor, useState, useCallback, useEffect } from "react";
import Card from "../../components/Card/Card";
import {
  Grid,
  CardContent,
  makeStyles,
  Typography,
  Link,
  createStyles,
  Theme,
  Button
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import InputField from "../../components/InputField/InputField";
import { Add } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inputInput: {
      width: "90px"
    },
    inputInputInput: {
      width: "130px"
    },
    title: {
      marginLeft: "auto",
      marginRight: "auto",
      marginBottom: "20px"
    },
    backgroundCard: {
      backgroundColor: "#C0C0C0"
    },
    text: {
      marginTop: "20px"
    },
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200
    },
    add: {
      fontSize: "13px"
    }
  })
);

export default function Ticket(props: any) {
  const classes = useStyles();

  const deleteTicket = (index: number) => {
    delete props.tickets[index];
    props.handleChange(props.tickets, "tickets");
  };

  function addTicket() {
    let newTicket = {
      id: props.tickets.length,
      ticket_name: "",
      price: 0,
      ticket_amount: 0,
      date_start: new Date(),
      date_end: new Date()
    };
    props.tickets.push(newTicket);
    props.handleChange(props.tickets, "tickets");
  }

  return (
    <Card>
      <Grid item>
        <Typography className={classes.title} variant="h3" align="center">
          Tickets
        </Typography>
      </Grid>
      {props.tickets.map((ticket: any, index: number) => (
        <TicketRow
          ticket={ticket}
          tickets={props.tickets}
          key={index}
          id={index}
          handleChange={props.handleChange}
          deleteTicket={deleteTicket}
        />
      ))}
      <Typography>
        <Link component="button" variant="body2" onClick={addTicket}>
          <Add className={classes.add} />
          Add ticket
        </Link>
      </Typography>
    </Card>
  );
}

const TicketRow = (props: any) => {
  const classes = useStyles();

  const [values, setValues] = useState({
    ticket_name: "",
    price: 0,
    ticket_amount: 0,
    date_start: new Date(),
    date_end: new Date()
  });

  useEffect(() => {
    if (props.ticket !== undefined) {
      setValues({
        ticket_name: props.ticket.ticket_name,
        price: props.ticket.price,
        ticket_amount: props.ticket.ticket_amount,
        date_start: props.ticket.date_start,
        date_end: props.ticket.date_end
      });
    }
  }, []);

  useEffect(() => {
    props.tickets[props.tickets.indexOf(props.ticket)] = {
      id: props.ticket.id,
      ticket_name: values.ticket_name,
      price: values.price,
      ticket_amount: values.ticket_amount,
      date_start: values.date_start,
      date_end: values.date_end
    };
    props.handleChange(props.tickets, "tickets");
  }, [values]);

  const handleChange = (event: any, name: string = "") => {
    if (name === "") {
      const { name, value } = event.target;
      setValues({ ...values, [name]: value });
    } else {
      setValues(values => ({ ...values, [name]: event }));
    }
  };

  return (
    <CardContent>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container spacing={1}>
          <Grid item className={classes.text}>
            Name
          </Grid>
          <Grid item className={classes.inputInputInput}>
            <InputField
              label="Name"
              name="ticket_name"
              value={props.ticket.ticket_name}
              onChange={handleChange}
            ></InputField>
          </Grid>
          <Grid item className={classes.text}>
            Price
          </Grid>
          <Grid item className={classes.inputInput}>
            <InputField
              label="Price"
              name="price"
              value={props.ticket.price}
              onChange={handleChange}
            ></InputField>
          </Grid>
          <Grid item className={classes.text}>
            Quantity
          </Grid>
          <Grid item className={classes.inputInput}>
            <InputField
              label="Quantity"
              name="ticket_amount"
              value={props.ticket.ticket_amount}
              onChange={handleChange}
            ></InputField>
          </Grid>
          <Grid item xs>
            <KeyboardDatePicker
              name="date_start"
              disableToolbar
              variant="inline"
              format="dd-MM-yy"
              margin="normal"
              id="date-picker-inline"
              autoOk={true}
              label="Start Date"
              value={props.ticket.date_start}
              onChange={e => handleChange(e, "date_start")}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </Grid>
          <Grid item xs>
            <KeyboardDatePicker
              name="date_end"
              disableToolbar
              variant="inline"
              format="dd-MM-yy"
              margin="normal"
              id="date-picker-inline"
              label="End Date"
              value={props.ticket.date_end}
              onChange={e => handleChange(e, "date_end")}
            />
          </Grid>
          <Button onClick={() => props.deleteTicket(props.id)}>Slett</Button>
        </Grid>
      </MuiPickersUtilsProvider>
    </CardContent>
  );
};
