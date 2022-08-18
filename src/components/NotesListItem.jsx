import React, {useState} from 'react';
import {Button, Container, Grid, Paper, Typography} from "@mui/material";
import {
    AddBoxOutlined,
    ArrowDownward,
    ArrowUpward,
    BuildOutlined,
    DeleteOutline,
    IndeterminateCheckBoxOutlined
} from "@mui/icons-material";
import NotesList from "./NotesList";
import {pink} from "@mui/material/colors";
import Modal from "./Edit";
import Edit from "./Edit";


const NotesListItem = ({
                           listLength,
                           item,
                           index,
                           deleteItem,
                           upOrDownItem,
                           addSubList,
                           deleteSubList,
                           editItem
                       }) => {

    const [open, setOpen] = useState(false)

    const {text, id} = item

    const handleOpen = () => setOpen(prevState => !prevState);

    return (
        <Container>
            <Paper elevation={2}
                   sx={{
                       display: "flex",
                       justifyContent: "spase-between",
                       alignItems: "center",
                       width: "700px",
                       height: "100px"
                   }}>
                <Grid
                    item
                    padding="5px"
                    flex
                    flexDirection="column"

                >
                    <Button disabled={index === 0}>
                        <ArrowUpward onClick={() => upOrDownItem(item, -1)}/>
                    </Button>
                    <Button disabled={index === listLength - 1}>
                        <ArrowDownward onClick={() => upOrDownItem(item, 1)}/>
                    </Button>
                </Grid>
                <Grid xs={12} md={10} item padding="15px">
                    {open
                        ? <Edit item={item} editItem={editItem} setOpen={setOpen} open={open}/>
                        : <Typography sx={{fontSize: "20px"}}>
                            {text}
                        </Typography>
                    }

                </Grid>
                <Grid
                    item
                    padding="5px"
                    height="80px"
                    width="100px"
                    flex
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <BuildOutlined onClick={handleOpen}/>

                    {item.sublist
                        ? <IndeterminateCheckBoxOutlined sx={{color: pink[500]}} onClick={() => deleteSubList(id)}/>
                        : <AddBoxOutlined onClick={() => addSubList(id)}/>
                    }
                    <DeleteOutline
                        sx={{color: pink[500]}}
                        onClick={() => deleteItem(id)}/>
                </Grid>
            </Paper>
            {item.sublist &&
                <NotesList/>
            }
        </Container>
    );
};

export default NotesListItem;