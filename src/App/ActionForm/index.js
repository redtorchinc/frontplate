import path from 'path';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';


const styles = theme  => ({
    root: {
        width: '100%',
    },
});


import UploadField from './UploadField';

class ActionForm extends Component {

    uploadFile(file) {
        // console.log(file, file.name.match(/\.pdf$/i));

        // simple check for pdf
        if (!(file.type == 'applicaton/pdf' || file.type.match(/.+\/pdf$/i) || file.name.match(/\.pdf$/i))) {
            return null;
        }

        const data = new FormData();
        data.append('file', file, file.name);
        data.append('fileinfo', JSON.stringify({
            filename: file.name,
            lastModified: file.lastModified,
            size: file.size,
            type: file.type
        }));

        fetch('/upload', {
            method: 'POST',
            body: data,
            cache: 'no-cache',
        })
        .then(res => res.json())
        .then(data => {
            // do stuff here.. also probably turn this into an async function?

            console.log(data);
        });
    }

    render() {
        const { classes, theme, children } = this.props;

        return  (
            <form className={classes.root}>
                <UploadField onSelect={f => this.uploadFile(f)}/>
                <ExpansionPanel defaultExpanded>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">Options</Typography>
                    </ExpansionPanelSummary>
                </ExpansionPanel>
            </form>
        );
    }
}

export default withStyles(styles, { withTheme: true })(ActionForm);
