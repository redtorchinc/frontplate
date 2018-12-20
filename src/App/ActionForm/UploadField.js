import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = theme  => ({
    paperRoot: {
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1,
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
        marginTop: theme.spacing.unit * 8,
    },
    filenameButtonText: {
        paddingLeft: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        overflow: 'visible',
        whiteSpace: 'nowrap'
    },
    filenameField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    }
});


class UploadField extends Component {

    state = {
        fileName: null,
    };

    constructor (props) {
        super(props);

        this.selectFile = this.selectFile.bind(this);
    }

    selectFile(file) {
        this.setState({fileName: file.name});

        if (this.props.onSelect) {
            this.props.onSelect(file);
        }
    }


    render() {
        const { classes, theme, children } = this.props;

        return (
            <Paper className={classes.paperRoot} >
                <input ref={'file-upload'} type="file" hidden onChange={ e => this.selectFile(e.target.files[0]) }/>
                <Button variant="contained" color="primary"
                    onClick={e => { this.refs['file-upload'].click()}} >
                    <Typography color="inherit"
                        className={classes.filenameButtonText} >
                        Choose File
                    </Typography>
                </Button>
                <TextField fullWidth label="Filename" margin="dense" variant="outlined"
                    className={classes.filenameField}
                    value={this.state.fileName || ''}
                    onClick={e => { this.refs['file-upload'].click()}} />
            </Paper>
        )

    }
}

export default withStyles(styles, { withTheme: true })(UploadField);
