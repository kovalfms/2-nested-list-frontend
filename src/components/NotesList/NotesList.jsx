import { useContext} from "react";
import {Container, Grid} from "@mui/material";
import {CustomContext} from "../../Context";
import Form from "../MainForm/Form";
import NotesListItem from "../NotesItem/NotesListItem";


const NotesList = () => {
    const {notes} = useContext(CustomContext)

    return (
        <Container>
            <Grid
                container
                flex
                justifyContent="center"
                flexDirection="column"
                alignItems="center"
                width="100%"
            >
                <Grid item>
                    <Form />
                </Grid>
                {notes.map((item, index) =>
                    <Grid
                        width="800px"
                        paddingTop="16px"
                        item
                        key={item.id}>
                        <NotesListItem
                            item={item}
                            index={index}
                            listLength={notes.length}
                            notes={notes}
                        />
                    </Grid>
                )}
            </Grid>
        </Container>

    )
}
export default NotesList;