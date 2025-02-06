import ColorProvider from '@/Components/system/ColorProvider'
import Button from '@mui/material/Button'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { useForm } from '@inertiajs/react'
import { enqueueSnackbar } from 'notistack';
import { CreditScoreHistory } from '@/types';

interface Props {
    history: CreditScoreHistory;
}

export default function RemoveButton({ history }: Props) {

    const { data, setData, post, reset, processing, errors } = useForm({
        history_id: history.id,
        message: ""
    });

    function removePoints() {
        // reset()

        post('/class/students/profile/remove_credit_score', {
            onSuccess: (response) => {
                console.log("Success", response);
                enqueueSnackbar("Points removed.", { variant: "success" });
            },
            onError: (response) => {
                console.log("Error me", response);
                enqueueSnackbar(errors.message, { variant: "error" });

            }
        });
        console.log(errors);

    }

    return (
        <>
            <Button
                variant='text'
                color='inherit'
                disableElevation
                disabled={processing}
                startIcon={
                    <ColorProvider color='#f00'>
                        <DeleteForeverRoundedIcon color='primary' />
                    </ColorProvider>
                }
                sx={{
                    textTransform: 'none'
                }}
                onClick={removePoints}
            >
                {processing ? "Removing" : 'Remove'}
            </Button>
        </>
    )
}
