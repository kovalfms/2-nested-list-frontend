import React, {useContext, useState} from 'react';
import {Button, Container, Grid, Paper, Typography} from "@mui/material";
import {ArrowDownward, ArrowUpward,} from "@mui/icons-material";
// import NotesList from "../NotesList/NotesList";
import Edit from "../EditForm/Edit";
import SettingMenu from "../SettingsMenu/Menu";
import {CustomContext} from "../../Context";


const NotesListItem = ({listLength, item, index,}) => {
    const {upOrDownItem} = useContext(CustomContext)

    const [openEdit, setOpenEdit] = useState(false)

    const {text, id} = item

    const handleOpenEdit = () => setOpenEdit(prevState => !prevState);

    return (
        <Container sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column"
        }}>
            <Paper elevation={2}
                   sx={{
                       display: "flex",
                       justifyContent: "spase-between",
                       alignItems: "center",
                       width: "500px",
                       height: "100%",
                   }}>
                <Grid
                    item
                    flex
                    flexDirection="column"
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
                            openEdit={openEdit}/>
                        : <Typography
                            sx={{
                                fontSize: "20px",
                                wordWrap: "break-word",
                                padding: "5px"
                            }}
                        >
                            {text}
                        </Typography>
                    }

                </Grid>

                <SettingMenu item={item} handleOpenEdit={handleOpenEdit}/>

            </Paper>
            {item.sublist &&
                <p>SUBLIST ADDED</p>
                // <NotesList
                //     // data={item.sublist}
                //     // onUpdate={setNotes}
                //     // parentData={notes}
                //     // parentId={item.id}
                // />
            }
        </Container>
    );
};

export default NotesListItem;