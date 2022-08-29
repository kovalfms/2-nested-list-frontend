import React, {useState} from 'react';
import {Badge, Button, Grid, IconButton, Paper, Typography} from "@mui/material";
import {ArrowDownward, ArrowUpward, VisibilityOffOutlined, VisibilityOutlined,} from "@mui/icons-material";
import Edit from "../EditForm/Edit";
import SettingMenu from "../SettingsMenu/Menu";
import NotesList from "../NotesList/NotesList";


const NotesListItem = (
    {
        notes,
        setNotes,
        listLength,
        item,
        index,
        upOrDownItem,
        editItem,
        deleteItem,
        addSubList,
        addNewItem,
        deleteSublist
    }
) => {

    const [openEdit, setOpenEdit] = useState(false)
    const [openSublist, setOpenSublist] = useState(false)
    const [openFullText, setOpenFullText] = useState(false)

    const {text, id, sublist} = item

    const handleOpenEdit = () => setOpenEdit(prevState => !prevState);
    const handleOpenSublist = () => setOpenSublist(prevState => !prevState);
    const handleOpenFullText = () => setOpenFullText(prevState => !prevState);

    return (
        <Grid container flex justifyContent="center" alignItems="center">
            <Paper
                elevation={2}
                sx={{
                    display: "flex",
                    justifyContent: "spase-between",
                    alignItems: "center",
                    width: "500px",
                    height: "100%",
                    position: "relative"
                }}
            >
                <Grid
                    item
                    flex
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    width="50px"

                >
                    <Button disabled={index === 0} sx={{width: "20px"}}>
                        <ArrowUpward onClick={() => upOrDownItem(id, item, -1)}/>
                    </Button>
                    <Button disabled={index === listLength - 1}>
                        <ArrowDownward onClick={() => upOrDownItem(id, item, 1)}/>
                    </Button>
                </Grid>
                <Grid xs={14} md={10} item padding="10px" display="block">
                    {openEdit
                        ? <Edit
                            item={item}
                            setOpenEdit={setOpenEdit}
                            openEdit={openEdit}
                            editItem={editItem}
                        />
                        : <Typography
                            onClick={handleOpenFullText}
                            sx={!openFullText
                                ? {
                                    fontSize: "20px",
                                    wordWrap: "break-word",
                                    padding: "5px",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis"
                                }
                                : {
                                    fontSize: "20px",
                                    wordWrap: "break-word",
                                    padding: "5px",
                                }
                            }
                        >
                            {text}
                        </Typography>
                    }
                </Grid>
                <Grid item sx={{position: "absolute", right: 0, top: 35}}>
                    <IconButton onClick={handleOpenSublist}>
                        {sublist && openSublist
                            ? <Badge badgeContent={sublist?.length} color="primary">
                                <VisibilityOffOutlined color="action"/>
                            </Badge>
                            : <Badge badgeContent={sublist?.length} color="primary">
                                <VisibilityOutlined color="action"/>
                            </Badge>
                        }
                    </IconButton>

                </Grid>
                <Grid item sx={{position: "absolute", right: 0, top: 0}}>
                    <SettingMenu
                        item={item}
                        handleOpenEdit={handleOpenEdit}
                        deleteItem={deleteItem}
                        addSubList={addSubList}
                        deleteSublist={deleteSublist}
                        addNewItem={addNewItem}
                    />
                </Grid>
            </Paper>
            {openSublist && item.sublist &&
                <NotesList
                    data={item.sublist}
                    onUpdate={setNotes}
                    parentData={notes}
                    parentId={item.id}
                />
            }
        </Grid>
    )
};

export default NotesListItem;