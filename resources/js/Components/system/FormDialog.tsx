import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
    size?: any;
    dialog_button: React.ReactNode;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    children: React.ReactNode;
    submit_label?: string | React.ReactNode;
    onSubmitFunction?: (formJson: any) => void;
}

export default function FormDialog({ size = 'md', dialog_button, title, description, children, submit_label, onSubmitFunction }: Props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <span onClick={handleClickOpen}>
                {dialog_button}
            </span>
            <Dialog
                fullWidth={true}
                fullScreen={size == 'full' ? true : false}
                maxWidth={size}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData as any).entries());
                        // const email = formJson.email;
                        if (onSubmitFunction) {
                            onSubmitFunction(formJson);
                        }

                        handleClose();
                    },
                }}
            >
                <DialogTitle>
                    <div className="flex justify-between items-center">
                        <div className='text-end'>
                            {title}
                        </div>
                        <div className='text-end'>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handleClose}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                        </div>
                    </div>

                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {description}
                    </DialogContentText>
                    {children}
                </DialogContent>
                <DialogActions>


                    {onSubmitFunction && (
                        <>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">{submit_label}</Button>
                        </>
                    )}
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
