import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface Props {
    isopen: boolean;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    dialog_button: React.ReactNode;
    children: React.ReactNode;
    submit_label: React.ReactNode;
    onSubmitFunction: (formJson: any) => void;
}

export default function FormDialog({title, description, dialog_button, isopen, children, submit_label, onSubmitFunction } : Props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        if(isopen){
            handleClickOpen();
        } else {
            handleClose();
        }
    },[isopen]);

    return (
        <React.Fragment>
            <span onClick={handleClickOpen}>
                {dialog_button}
            </span>
            <Dialog
                fullWidth={true}
                maxWidth={'sm'}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData as any).entries());
                        // const email = formJson.email;
                        onSubmitFunction(formJson);
                        
                        handleClose();
                    },
                }}
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {description}
                    </DialogContentText>
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">{submit_label}</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
