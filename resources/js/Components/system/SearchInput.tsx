import React from 'react'
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';

interface Props {
    onChange: (e: any) => void;
    placeholder: string;
    className?: string;
}

export default function SearchInput({ onChange, placeholder, className }: Props) {
  return (
    <Paper
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
    >
        <IconButton sx={{ p: '10px' }} aria-label="menu">
            <SearchIcon />
        </IconButton>
        <input type="search" placeholder={placeholder} className={`w-full border-0 outline-0 focus:ring-0 ${className}`} onChange={onChange} />
    </Paper>
  )
}
