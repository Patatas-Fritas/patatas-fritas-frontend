import React from 'react';
import Grid from "@material-ui/core/Grid";
import {useHistory} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import {Button} from "@material-ui/core";
import {grey, yellow} from "@material-ui/core/colors";

const useStyles = makeStyles({
  color: {
    backgroundColor: yellow[700],
    color: grey[100]
  }
});

export function EducationPage() {

  const history = useHistory();
  const styles = useStyles()

  return (
    <div style={{ display: "flex" }}>
      <div style={{ margin: "0 auto" }}>
        <Typography color="primary" variant="h4"  style={{ marginTop: "2vh" }}>Új feladat</Typography>
        <Grid container direction="row"  alignItems="center" style={{ marginTop: '5vh' }} spacing={4}>
          <Grid item xs={6} md={6} lg={6}>
            <Button variant="contained" className={styles.color} onClick={() => {
              history.push('/admin/hotspot')
            }}>Akasztófa</Button>
          </Grid>
          <Grid item xs={6} md={6} lg={6}>
            <Button variant="contained" color="primary" onClick={() => {
              history.push('/admin/hotspot')
            }}>Képes</Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
