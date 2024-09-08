import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from '@inertiajs/react';

// {label, }

interface MenuItemType { 
    link?: string;
    label: string;
    action?: () => void;
}

interface Props {
    buttonlabel: string | React.ReactNode;
    menuitems: MenuItemType[];
}

export default function BasicMenu({menuitems, buttonlabel}: Props){
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (action?: () => void) => {
        if(action){
            action();
        }
        setAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    function CustomMenu({item}: {item: MenuItemType}){
        
        if(item.link){
            return (
                <Link href={item.link || ""}>
                    <MenuItem onClick={() => handleClose()}>{item.label}</MenuItem>
                </Link>
            )
        }
        
        return (
            <MenuItem onClick={() => handleClose(item.action)}>{item.label}</MenuItem>
        )
    }

    return (
        <div>
            <span
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                {buttonlabel}
            </span>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {menuitems.map((item: MenuItemType) => (
                    <CustomMenu key={item.label} item={item} />
                ))}
            </Menu>
        </div>
    );
}
