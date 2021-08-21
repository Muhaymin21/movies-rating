import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
    Button,
    Container,
    Grid,
    TextField
} from "@material-ui/core";
import axios from "axios";
import Loader from "../Layout/Loader";


const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    },
    form: {
        '& > *': {
            margin: theme.spacing(1),
            width: '70vw'
        },
    },
    gridSize: {
        '& > *': {width: "100%"}
    },
    img: {
        width: 200,
        height: 100,
        marginTop: 15
    }
}));

export default function NewMovie() {
    const classes = useStyles();
    const [imageURL, setImageURL] = React.useState("");
      const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(true);
    const [formControl, setFormControl] = React.useState({
        name: {
            error: false,
            errorMessage: "",
            canSubmit: false,
            value: ""
        },
        description: {
            error: false,
            errorMessage: "",
            canSubmit: false,
            value: ""
        },
        image: {
            error: false,
            errorMessage: "",
            canSubmit: false,
            value: ""
        },
        date: {
            error: false,
            errorMessage: "",
            canSubmit: false,
            value: ""
        }
    });

    function nameChangeHandler(e) {
        let error = false;
        let errorMessage = "";
        let value = e.target.value;
        if (value === '') {
            errorMessage = "Please input name.";
            error = true;
        } else if (value.length > 30) {
            errorMessage = "Name is to long.";
            error = true;
        }
        setFormControl({
            ...formControl,
            name: {
                error,
                errorMessage,
                canSubmit: !error,
                value
            }
        })
    }

    function descriptionChangeHandler(e) {
        let error = false;
        let errorMessage = "";
        let value = e.target.value;
        if (value === '') {
            errorMessage = "Please input description.";
            error = true;
        }
        setFormControl({
            ...formControl,
            description: {
                error,
                errorMessage,
                canSubmit: !error,
                value
            }
        })
    }

    function testImage(url, timeoutT) {
        return new Promise(function (resolve, reject) {
            const timeout = timeoutT || 5000;
            let timer, img = new Image();
            img.onerror = img.onabort = function () {
                clearTimeout(timer);
                reject("error");
            };
            img.onload = function () {
                clearTimeout(timer);
                resolve(true);
            };
            timer = setTimeout(function () {
                img.src = "//!!!!/test.jpg";
                reject("timeout");
            }, timeout);
            img.src = url;
        });
    }

    function imageChangeHandler(e) {
        let error = false;
        let errorMessage = "";
        let url = e.target.value;
        if (url === '') {
            errorMessage = "Please input image url.";
            error = true;
            setImageURL("");
        } else if (url.match(/\.(jpeg|jpg|png)$/) == null) {
            errorMessage = "Invaild image url.";
            error = true;
            setImageURL("");
        } else {
            testImage(url, 15000).then(r => {
                setImageURL(url);
            }).catch((e) => {
                errorMessage = e;
                error = true;
                setImageURL("");
            });
        }
        setFormControl({
            ...formControl,
            image: {
                error,
                errorMessage,
                canSubmit: !error,
                value: url
            }
        })
    }

    function dateHandler(event) {
        let error = false;
        let errorMessage = "";
        let value = event.target.value;
        if (value === '') {
            errorMessage = "Please choose date.";
            error = true;
        }
        setFormControl({
            ...formControl,
            date: {
                error,
                errorMessage,
                canSubmit: !error,
                value
            }
        })
    }

    function submitHandler(e){
        e.preventDefault();
        if (!formControl.name.canSubmit)
            setFormControl({...formControl, name: {...formControl.name, error: true}});
        else if (!formControl.description.canSubmit)
            setFormControl({...formControl, description: {...formControl.description, error: true}});
        else if (!formControl.date.canSubmit)
            setFormControl({...formControl, date: {...formControl.date, error: true}});
        else if (!formControl.image.canSubmit)
            setFormControl({...formControl, image: {...formControl.image, error: true}});
        else {
            setIsLoaded(false);
            axios.post('/api/movies/create', {
                data: {
                    name: formControl.name.value,
                    description: formControl.description.value,
                    date: formControl.date.value,
                    image: formControl.image.value
                }
            }).then(r=>{
                console.log(r);
            }, e=>{
                setError(e);
                console.log(error);
            }).finally(()=>{setIsLoaded(true);});
        }
    }

    if (isLoaded)
    return (
        <Container className={classes.root}>
            <form className={classes.form} noValidate onSubmit={submitHandler}>
                <Grid container spacing={2} justifyContent="flex-end">
                    <Grid item xs={12} className={classes.gridSize}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            error={formControl.name.error}
                            helperText={formControl.name.errorMessage}
                            onInput={nameChangeHandler}
                            value={formControl.name.value}
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.gridSize}>
                        <TextField
                            label="Description"
                            variant="outlined"
                            error={formControl.description.error}
                            helperText={formControl.description.errorMessage}
                            onInput={descriptionChangeHandler}
                            multiline
                            rows={5}
                            value={formControl.description.value}
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.gridSize}>
                        <TextField
                            variant="outlined"
                            label="Relase date"
                            type="date"
                            onChange={dateHandler}
                            error={formControl.date.error}
                            helperText={formControl.date.errorMessage}
                            value={formControl.date.value}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item container xs={12} className={classes.gridSize}>
                        <TextField
                            label="Imgae URL"
                            variant="outlined"
                            error={formControl.image.error}
                            value={formControl.image.value}
                            helperText={formControl.image.errorMessage}
                            onInput={imageChangeHandler}
                        />
                        {imageURL && (
                            <img src={imageURL} className={classes.img} alt="poster"/>
                        )}
                    </Grid>
                    <Grid item xs={12} className={classes.gridSize}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
    else return <Loader/>
}
