import { CreditScoreHistory } from '@/types'
import Alert from '@mui/material/Alert'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import RemovePoints from './RemovePoints'

export default function HistoryTable({ histories }: { histories: CreditScoreHistory[] }) {

    return (
        <>
            <Table
                size="small"
                aria-label="simple table"
            >
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <b>Points</b>
                        </TableCell>
                        <TableCell align="left">
                            <b>Date</b>
                        </TableCell>
                        <TableCell align="left">
                            <b>Action</b>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {histories?.map((history, index: number) => (
                        <TableRow
                            className="hover:cursor-pointer hover:bg-gray-100 duration-100"
                            key={history.id}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell align="left">
                                <span className={(history.mode == 'add') ? 'text-green-600' : 'text-red-500'}>
                                    {history.mode == 'add' ? '+ ' : '- '}{history.points}
                                </span>
                            </TableCell>
                            <TableCell component="th" scope="row">
                                <span className="text-gray-600">
                                    {history.date}
                                </span>
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {history.mode == 'add' && (
                                    <RemovePoints history={history} />
                                )}

                                {history.mode == 'deduct' && (
                                    <>
                                        <span className='text-red-500'>
                                            Removed
                                        </span>
                                        &nbsp;at {history.date_removed}
                                    </>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div>
                {!histories && (
                    <Alert severity='info'>
                        No history
                    </Alert>
                )}
            </div>
        </>
    )
}
