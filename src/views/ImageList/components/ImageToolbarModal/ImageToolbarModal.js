import React from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import Dropzone from 'react-dropzone';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import CreatableSelectAutocomplete from '../../../../ui/select/singleSelectAutoComplete/CreatableSelectAutoComplete';

import ENDPOINTS from '../../../../config/endpoint';
import HttpService from '../../../../services/httpService';
import { fetchAllUsers } from '../../../../api/users-api';

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: '30%',
        height: '33%',
        height: 'auto',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        outline: 'none',
        minWidth: '250px',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    },
    content: {
        maxHeight: 'calc(70vh)',
        overflow: 'auto',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    padding: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    },
    divider: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(3)
    },
    marginBottom: {
        marginBottom: theme.spacing(2)
    },
    button: {
        marginRight: theme.spacing(1)
    },
    rightIcon: {
        marginLeft: theme.spacing(1)
    },
    input: {
        display: 'none'
    },
    filesUpload: {
        display: 'flex'
    },
    errorMessage: {
        color: '#f44336'
    },
    uploadFileButton: {
        '&.error': {
            marginBottom: theme.spacing(1),
            color: '#f44336',
            border: '1px solid #f44336'
        }
    },
    fileList: {
        marginTop: theme.spacing(1)
    }
}));

const ImageToolbarModal = React.forwardRef((props, ref) => {
    const classes = useStyles();
    const maxSize = 5242880;
    const { closeModal, editMode = false, payload, setPayload, getImages, pageNumber } = props;
    const [file, setFile] = React.useState(null);
    const [patientSuggestions, setPatientSuggestions] = React.useState([]);
    React.useEffect(() => fetchUserSuggestions(), []);


    const fetchUserSuggestions = () => {
        fetchAllUsers()
            .then(
                data => setPatientSuggestions(toSuggestionData(data)),
                error => console.error(error));
    };

    const submitImage = () => {
        const httpClient = new HttpService();
        const data = new FormData();
        data.append('description', payload.description);
        data.append('file', file);

        const options = {
            endpoint: `${ENDPOINTS.USERS}/${payload.id}/medical-images`,
            payload: data,
            onSuccess: _handleSuccess,
            onError: _handleError
        };
        httpClient.post(options);
    };

    const onFileDrop = acceptedFiles => {
        setFile(acceptedFiles[0]);
    };

    const _handleSuccess = () => {
        closeModal();
        getImages(pageNumber - 1);
    };

    const _handleError = error => {
        console.error(error);
    };

    const handleDescriptionChange = name => event => {
        setPayload({ ...payload, [name]: event.target.value });
    };

    const handleSelect = obj => {
        if (obj) setPayload({ ...payload, id: obj.value });
    }

    return (
        <ValidatorForm className={classes.content} noValidate onSubmit={submitImage}>
            <Paper className={classes.paper} ref={ref} tabIndex={-1} square>
                <div className={classes.padding}>
                    <Grid container item xs={12} justify="space-between">
                        <Typography variant="h6">Image</Typography>
                        <Button onClick={closeModal}>
                            <CloseIcon />
                        </Button>
                    </Grid>
                    <Divider className={classes.divider} />
                </div>
                <div className={classes.content}>
                    <Grid container>
                        <Grid item xs={12}>
                            <CreatableSelectAutocomplete
                                options={patientSuggestions}
                                onSelect={handleSelect}
                                required
                                label={'Patient'}
                                selectedValue={!!payload.firstName ? { label: payload.lastName } : null}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextValidator
                                id="description"
                                name="description"
                                label="Description"
                                margin="dense"
                                variant="outlined"
                                value={payload.description || ''}
                                onChange={handleDescriptionChange('description')}
                                required
                                validators={['required']}
                                errorMessages={'To pole jest wymagane'}
                                fullWidth
                                multiline
                                rows={4}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="body2" color="textSecondary" className={classes.marginBottom}>
                                Upload Image
                  </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={classes.filesUpload}>
                                <label htmlFor="outlined-button-file">
                                    <Dropzone
                                        onDrop={onFileDrop}
                                        accept="image/png, image/jpeg"
                                        minSize={0}
                                        maxSize={maxSize}
                                    >
                                        {({
                                            getRootProps,
                                            getInputProps,
                                            isDragReject,
                                            rejectedFiles,
                                            acceptedFiles
                                        }) => {
                                            const isFileTooLarge =
                                                rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;
                                            return (
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    <Button
                                                        variant="outlined"
                                                        color="primary"
                                                        component="span"
                                                        className={`${classes.uploadFileButton} ${
                                                            isFileTooLarge || rejectedFiles.length > 0 || isDragReject
                                                                ? ' error'
                                                                : ''
                                                            }`}
                                                    >
                                                        Upload
                                <CloudUploadIcon className={classes.rightIcon} />
                                                    </Button>
                                                    {acceptedFiles[0] && (
                                                        <div className={classes.fileList}>{acceptedFiles[0].name}</div>
                                                    )}
                                                    <div className={classes.errorMessage}>
                                                        {(isDragReject || (rejectedFiles.length > 0 && !isFileTooLarge)) &&
                                                            'Zły format pliku! Wgraj plik png lub jpg'}
                                                        {isFileTooLarge && 'Wgrany plik jest zbyt duży!'}
                                                    </div>
                                                </div>
                                            );
                                        }}
                                    </Dropzone>
                                </label>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <div className={classes.padding}>
                    <Grid container item xs={12} justify={editMode ? 'space-between' : 'flex-end'}>
                        <Button type="submit" variant="contained" color="primary">
                            Save
                  <SaveIcon className={classes.rightIcon} />
                        </Button>
                    </Grid>
                </div>
            </Paper >
        </ValidatorForm >
    );
});
export default ImageToolbarModal;

const toSuggestionData = usersPage =>
    usersPage.users.map(user => ({
        label: `${user.firstName} ${user.lastName}`,
        value: user.id
    }));