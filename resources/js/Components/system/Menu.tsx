import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from '@inertiajs/react';
import EditIcon from '@mui/icons-material/Edit';

// {label, }

interface MenuItemType { 
    label: string;
    link?: string;
    icon?: React.ReactNode;
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

    function MenuItemContent({item}: {item: MenuItemType}){
        return (
            <div className='text-md w-full flex items-center me-10'>
                <div className='w-8 text-gray-500 me'>
                    {item.icon && item.icon}
                </div>
                <div className=''>
                    {item.label}
                </div>
            </div>
        )
    }

    function CustomMenu({item}: {item: MenuItemType}){
        
        if(item.link){
            return (
                <Link href={item.link || ""}>
                    <MenuItem onClick={() => handleClose()}>
                        <MenuItemContent item={item} />
                    </MenuItem>
                </Link>
            )
        }
        
        return (
            <MenuItem onClick={() => handleClose(item.action)}>
                <MenuItemContent item={item} />
            </MenuItem>
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
                elevation={1}
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                sx={{'marginTop': '12px'}}
            >
                {menuitems.map((item: MenuItemType) => (
                    <CustomMenu key={item.label} item={item} />
                ))}
            </Menu>
        </div>
    );
}
