import { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

interface Props {
    getValue: (value: string) => void
}

export default function QrcodeScanner({ getValue } : Props){

    // const [multiple, setMultiple] = useState<boolean>(true);

    function handleScan(result: any){
        // getValue
        getValue(result[0].rawValue);
    }

    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        
        // setMultiple(!multiple);
    //   };

    return (
        <>
            {/* <FormControlLabel control={<Switch
                checked={multiple}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
            />} label="Multiple Scan" /> */}
            
            {/* {multiple ? "Multiple Scan" : "jajja"} */}
            <Scanner allowMultiple={false} scanDelay={500} onScan={handleScan} />
            
        </>
    )
}