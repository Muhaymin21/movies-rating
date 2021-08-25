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
import useAlert from "../Hooks/useAlert";
import {useParams} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",

    },
    form: {
        '& > *': {
            margin: theme.spacing(1),
            width: '70vw'
        }
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

export default function MovieForm() {
    const classes = useStyles();
    const [imageURL, setImageURL] = React.useState("");
    const [isLoaded, setIsLoaded] = React.useState(true);
    const [setType, setMessage, setOpen, TransitionAlerts] = useAlert();
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
    const {movieID} = useParams();

    React.useEffect(() => {
        if (movieID) {
            setIsLoaded(false);
            axios.get('/api/movies/' + movieID).then(res => {
                if (res.data.success) {
                    const movie = res.data['movie'];
                    setFormControl({
                        name: {
                            error: false,
                            errorMessage: "",
                            canSubmit: true,
                            value: movie.name
                        },
                        description: {
                            error: false,
                            errorMessage: "",
                            canSubmit: true,
                            value: movie.description
                        },
                        image: {
                            error: false,
                            errorMessage: "",
                            canSubmit: true,
                            value: movie['imgPath']
                        },
                        date: {
                            error: false,
                            errorMessage: "",
                            canSubmit: true,
                            value: movie.date
                        }
                    });
                    setImageURL(movie['imgPath']);
                }
            }, error => {
                console.log(error)
            }).finally(() => {
                setIsLoaded(true);
            });
        }
    }, [movieID]);

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
            testImage(url, 15000).then(() => {
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

    function successHandler(res) {
        if (res.data.success) {
            setType("success");
            let action = movieID ? "updated," : "added with";
            setMessage(`The movie has been successfully ${action} ID: ${res.data.id}`);
            setOpen(true);
            setFormControl({
                name: {
                    ...formControl.name,
                    value: ""
                },
                description: {
                    ...formControl.description,
                    value: ""
                },
                date: {
                    ...formControl.date,
                    value: ""
                },
                image: {
                    ...formControl.image,
                    value: ""
                }
            })
            setImageURL("");
        }
    }

    function errorHandler(error) {
        setType("error");
        const action = movieID ? "update this movie" : "add a new movie:";
        setMessage(`Failed to ${action} ${error.response.data.message}`);
        setOpen(true);
    }

    function submitHandler(e) {
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
            const submitData = {
                name: formControl.name.value,
                description: formControl.description.value,
                date: formControl.date.value,
                image: formControl.image.value
            };
            if (movieID)
                axios.patch('/api/movies/' + movieID, submitData).then(successHandler, errorHandler).finally(() => {
                    setIsLoaded(true);
                });
            else
                axios.post('/api/movies/create', submitData).then(successHandler, errorHandler).finally(() => {
                    setIsLoaded(true);
                });
        }
    }

    return (
        <Container className={classes.root}>
            {isLoaded ? (
                <div className={classes.form}>
                    <TransitionAlerts/>
                    <form noValidate onSubmit={submitHandler}>
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
                </div>
            ) : (<Loader/>)}
        </Container>
    );
}
