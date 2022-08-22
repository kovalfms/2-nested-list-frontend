import React from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {
    AddOutlined,
    ClearOutlined,
    DeleteOutline,
    EditOutlined,
    MoreVert
} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {pink} from "@mui/material/colors";


const SettingMenu = (
    {
        handleOpenEdit,
        item,
        addSubList,
        deleteSublist,
        deleteItem
    }) => {


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const {id, sublist} = item

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);

    };

    return (
        <div>
            <IconButton
                onClick={handleClick}
            >
                <MoreVert/>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem onClick={handleClose}>
                    <IconButton size="medium" onClick={handleOpenEdit}>
                        <EditOutlined/>
                    </IconButton>
                    Edit post
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    {sublist
                        ? <>
                            <IconButton size="medium" onClick={() => deleteSublist(id)}>
                                <ClearOutlined sx={{color: pink[500]}}/>
                            </IconButton>
                            Remove sublist
                        </>

                        : <>
                            <IconButton size="medium" onClick={() => addSubList(id)}>
                                <AddOutlined/>
                            </IconButton>
                            Add sublist
                        </>
                    }
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <IconButton size="medium" onClick={() => deleteItem(id)}>
                        <DeleteOutline sx={{color: pink[500]}}/>
                    </IconButton>
                    Delete
                </MenuItem>
            </Menu>
        </div>
    );
}

export default SettingMenu