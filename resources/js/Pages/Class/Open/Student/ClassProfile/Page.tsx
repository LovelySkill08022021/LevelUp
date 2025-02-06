import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { useEffect, useState } from 'react'
import Layout from '../../Layout'
import type { Class, CreditScore, PageProps, User } from '@/types';
import Course from '@/Components/system/Course';
import StyleIcon from '@mui/icons-material/Style';
import InfoIcon from '@mui/icons-material/Info';
import HistoryIcon from '@mui/icons-material/History';
import EditCalendarRoundedIcon from '@mui/icons-material/EditCalendarRounded';
import SignalWifiStatusbarConnectedNoInternet4RoundedIcon from '@mui/icons-material/SignalWifiStatusbarConnectedNoInternet4Rounded';
import ColorProvider from '@/Components/system/ColorProvider';
import Button from '@mui/material/Button';
import CreditCard from './Components/CreditCard';
import IconButton from '@mui/material/IconButton';
import FormDialog from '@/Components/system/FormDialog';
import HistoryTable from './Components/HistoryTable';
import { SnackbarProvider } from 'notistack';
import AddPoints from './Components/AddPoints';

interface Props extends PageProps {
    _class: Class;
    student: User;
    credit_score_info: CreditScore;
}

export default function ClassProfilePage({ _class, auth, student, credit_score_info }: Props) {

    const [points, setPoints] = useState((credit_score_info?.points > 0) ? credit_score_info.points : 0);
    const [error, setError] = useState(false);

    useEffect(() => {
        setPoints((credit_score_info?.points > 0) ? credit_score_info.points : 0)
    }, [credit_score_info]);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Layout _class={_class} active_tab="students">
                <SnackbarProvider maxSnack={3} autoHideDuration={6000} />
                <div className='mb-5'>
                    <div className='font-bold text-xl mb-3'>
                        Student Status
                    </div>
                    <div className='font-bold'>
                        {student.last_name}, {student.first_name} {student.middle_name}
                    </div>
                    <div>
                        {student.email}
                    </div>
                    <div>
                        <Course course={student.course} />
                    </div>
                </div>
                <div>
                    <div className='font-bold text-xl mb-3'>
                        Credits
                    </div>
                    <CreditCard>
                        <div className='text-end'>
                            <FormDialog
                                title="History"
                                dialog_button={
                                    <IconButton size='small' className='absolute top-[0px] left'>
                                        <ColorProvider color="#999">
                                            <HistoryIcon color='primary' />
                                        </ColorProvider>
                                    </IconButton>
                                }
                                submit_label={undefined}
                            >

                                <HistoryTable histories={credit_score_info?.history} />
                            </FormDialog>
                        </div>
                        <div className="px-2">
                            <div className="mb-5">
                                <div className="text-center">
                                    <ColorProvider color='#aa00ff'>
                                        <StyleIcon sx={{ fontSize: '100px' }} color='primary' />
                                    </ColorProvider>
                                    <div className='ms-1 font-bold flex justify-center gap-2'>
                                        <div>
                                            {points} extra {points > 1 ? "points" : "point"}
                                        </div>
                                        <div>
                                            {error && (
                                                <ColorProvider color={'#ff3300'}>
                                                    <SignalWifiStatusbarConnectedNoInternet4RoundedIcon color='primary' />
                                                </ColorProvider>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className='text-start mt-3 text-gray-500'>
                                    <span className='text-sm'>
                                        It can be used to add scores to any activity.
                                    </span>
                                </div>
                            </div>
                            <div className='flex justify-between'>
                                <AddPoints
                                    points={points}
                                    class_id={_class.id}
                                    student_id={student.id}
                                    setPoints={setPoints}
                                    setError={setError}
                                />
                                <Button
                                    size='small'
                                    sx={{
                                        textTransform: 'none',
                                        color: "black",
                                        fontFamily: 'inherit'
                                    }}
                                    startIcon={
                                        <ColorProvider color="#f80">
                                            <EditCalendarRoundedIcon color='primary' />
                                        </ColorProvider>
                                    }
                                >
                                    Use
                                </Button>
                            </div>
                        </div>
                    </CreditCard>
                </div>
            </Layout >
        </AuthenticatedLayout >
    )
}


