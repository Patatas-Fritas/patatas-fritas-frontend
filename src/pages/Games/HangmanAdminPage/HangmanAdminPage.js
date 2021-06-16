import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { Box, Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { hangmanAction } from "../../../actions/hangman.admin.action";
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: 'Lato',
        width: '500',
        margin: theme.spacing(1),
        padding: '1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        "& .MuiFormLabel-root": {
            color: "#993166",
        },
    },
}));


function HangmanAdminPage() {
    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const [values, setValues] = useState([
    ]);

    const [title, setTitle] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setValues([]);
    };

    const addValue = () => {
        setValues([...values, ""]);
    };
    const handleValueChange = (index, e) => {
        const updatedValues = values.map((value, i) => {
            if (i === index) {
                return e.target.value
            } else {
                return value
            }
        })
        setValues(updatedValues);
    };
    const deleteValue = (jump) => {
        setValues(values.filter((j) => j !== jump));
    };

    const handleTitleChange = (event) => {
        event.preventDefault();
        const { value } = event.target;
        setTitle({ value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setOpen(false);
        setValues([]);
        const hangmanObj = {
            title: title.value,
            words: values,
        }
        dispatch(hangmanAction.saveHangman(hangmanObj));
    }

    const dispatch = useDispatch();

    return (
        <div className={classes.root}>
            <Button variant="outlined" color="primary" onClick={handleClickOpen} className={classes.root}>
                Készíts új akasztófát!
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle className={classes.root}>Akasztófa</DialogTitle>
                <DialogContent>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item xs={10}>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Cím"
                                onChange={(e) => handleTitleChange(e)}
                                color="secondary"
                                className={classes.root}
                            />
                        </Grid>
                    </Grid>
                    {values.map((jump, index) => (
                        <Box key={"jump" + index}>
                            <Grid container spacing={1} alignItems="flex-end">
                                <Grid item xs={10}>
                                    <TextField 
                                        autoFocus
                                        margin="dense"
                                        label="Szó"
                                        value={jump || ""}
                                        onChange={(e) => handleValueChange(index, e)}
                                        fullWidth
                                        color="secondary"
                                        className={classes.root}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <div
                                        className="font-icon-wrapper"
                                        onClick={() => deleteValue(jump)}
                                    >
                                        <IconButton aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                </Grid>
                            </Grid>
                        </Box>
                    ))}
                </DialogContent>
                <Button onClick={addValue} color="primary">
                    Új szó
                </Button>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained" color="secondary">
                        Mégse
                    </Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        Kész
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default HangmanAdminPage;