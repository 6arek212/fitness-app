import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import * as React from 'react';


const Transition = React.forwardRef(function Transition(
    props,
    ref,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const CustomDialog = ({ title, description, onConfirm, onCancel, isOpen }) => {
    return (
        <div>
            <Dialog
                open={isOpen}
                keepMounted
                TransitionComponent={Transition}
                onClose={onCancel}
                aria-describedby="alert-dialog-slide-description">

                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {description}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancel}>Disagree</Button>
                    <Button onClick={onConfirm}>Agree</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CustomDialog;