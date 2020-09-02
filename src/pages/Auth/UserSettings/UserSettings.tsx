import React from 'react';
import { useHistory } from 'react-router-dom';
import Grow from '@material-ui/core/Grow';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { ListItem } from '@material-ui/core';
import { MemoryRouter, Route } from 'react-router-dom';

import { Section } from 'components/SectionList';
import Paper from 'components/Paper';
import SectionList from 'components/SectionList';
import Dialog from 'components/Dialog';
import AppBar from 'layout/AppBar';

//import API from '../../api';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
    },
    paper: {
        // not necessary anymore?
        // marginTop: '64-px', // slight offset to make the component feel more vertically centered
        padding: theme.spacing(2),
    },
    img: {
        width: '100%',
        height: 'auto',
    },
}));

export default function UserSettings() {
    var anonymous = true; // TODO, should be part of the profile pulled from db
    var notify = true; // TODO see above
    var darkmode = false; // TODO see above
    var colorscheme = <h1>TODO</h1>; // TODO see above
    const history = useHistory();
    const classes = useStyles();

    const [form, setForm] = React.useState({
        username: '',
        password: '',
    });
    const handleChange = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
        id: string
    ) => {
        e.preventDefault();
        const { value } = e.target;
        setForm((state) => ({ ...state, [id]: value }));
    };

    const [openAppearance, setOpenAppearance] = React.useState(false);
    const [openLogout, setOpenLogout] = React.useState(false);
    const [openDisable, setOpenDisable] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [openFeedback, setOpenFeedback] = React.useState(false);
    const [openAboutUs, setOpenAboutUs] = React.useState(false);
    const [openPrivacyPolicy, setOpenPrivacyPolicy] = React.useState(false);
    const [openTOS, setOpenTOS] = React.useState(false);

    var userProfile: Section = {
        title: 'User',
        sectionData: [
            {
                image: 'https://i.imgur.com/3beQH5s.jpeg', // TODO pull from db of users for pic
                title: 'user.Fname user.Lname', // TODO pull from db of users for name
                subtitle: (
                    <Grid container spacing={2} alignContent='center'>
                        <Grid item xs={12}>
                            <TextField
                                id='username'
                                required
                                fullWidth
                                variant='outlined'
                                type='text'
                                value='pull from db for username'
                                onChange={(e) => handleChange(e, 'username')}
                                label='Username'
                                spellCheck={false}
                                autoComplete='off'
                                autoCorrect='off'
                                autoCapitalize='off'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id='email'
                                required
                                fullWidth
                                variant='outlined'
                                type='email'
                                value='push to db for password'
                                onChange={(e) => handleChange(e, 'email')}
                                label='email'
                                spellCheck={false}
                                autoComplete='off'
                                autoCorrect='off'
                                autoCapitalize='off'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id='password'
                                required
                                fullWidth
                                variant='outlined'
                                type='password'
                                value='push to db for password'
                                onChange={(e) => handleChange(e, 'password')}
                                label='Password'
                                spellCheck={false}
                                autoComplete='off'
                                autoCorrect='off'
                                autoCapitalize='off'
                            />
                        </Grid>
                    </Grid>
                ),
            },
        ],
    };

    var options: Section = {
        title: 'Options',
        sectionData: [
            {
                //image: 'o', // pull from db of users for pic
                title: '', // pull from db of users for name
                subtitle: (
                    <Grid container spacing={2} alignContent='center'>
                        <Grid item xs={12}>
                            <Button
                                onClick={() => {
                                    anonymous = !anonymous;
                                }}
                            >
                                Appear anonymous: {anonymous}
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                onClick={() => {
                                    notify = !notify;
                                }}
                            >
                                Notify me about upcoming Townhalls: {notify}
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <ListItem
                                button={true}
                                hidden={false}
                                onClick={() => setOpenAppearance(true)}
                            >
                                Appearance
                            </ListItem>
                            <Dialog
                                open={openAppearance}
                                title='Appearance'
                                onClose={() => setOpenAppearance(false)}
                            >
                                <h1>Dark mode: {darkmode}</h1>
                                <h2>Color scheme: {colorscheme}</h2>
                            </Dialog>
                        </Grid>
                    </Grid>
                ),
            },
        ],
    };

    var AccountSettings: Section = {
        title: 'Account Settings',
        sectionData: [
            {
                //image: 'https://i.imgur.com/3beQH5s.jpeg', // pull from db of users for pic
                title: '',
                subtitle: (
                    <Grid container spacing={2} alignContent='center'>
                        <Grid item xs={12}>
                            <ListItem
                                button={true}
                                hidden={false}
                                onClick={() => setOpenLogout(true)}
                            >
                                Logout
                            </ListItem>
                            <Dialog
                                open={openLogout}
                                title='You have been logged out'
                                onClose={() => {}}
                            >
                                <button
                                    onClick={() => setOpenLogout(false)} // TODO: go to home page
                                >
                                    Click here to return to the home page
                                </button>
                            </Dialog>
                        </Grid>
                        <Grid item xs={12}>
                            <ListItem
                                button={true}
                                hidden={false}
                                onClick={() => setOpenDisable(true)}
                            >
                                Disable Account
                            </ListItem>
                            <Dialog
                                open={openDisable}
                                title='Disable Account'
                                onClose={() => setOpenDisable(false)}
                            >
                                <h1>
                                    Disable Account?
                                    <p>
                                        You will no longer receive notifications
                                        about Town Halls and you can no longer
                                        join live Town Halls. You will still be
                                        able to log into your account. Please
                                        enter your password below twice to
                                        confirm.
                                    </p>
                                </h1>
                                <TextField
                                    id='Disable Account Password Entry One'
                                    required
                                    fullWidth
                                    variant='outlined'
                                    type='password'
                                    value=''
                                    onChange={(e) => {}}
                                    label='Please enter your password'
                                    spellCheck={false}
                                    autoComplete='off'
                                    autoCorrect='off'
                                    autoCapitalize='off'
                                />
                                <TextField
                                    id='Disable Account Password Entry Two'
                                    required
                                    fullWidth
                                    variant='outlined'
                                    type='password'
                                    value=''
                                    onChange={(e) => {}}
                                    label='Please enter your password again to DISABLE your account'
                                    spellCheck={false}
                                    autoComplete='off'
                                    autoCorrect='off'
                                    autoCapitalize='off'
                                />
                                {/* TODO: If they enter their password correctly twice, redirects them to home page */}
                            </Dialog>
                        </Grid>
                        <Grid item xs={12}>
                            <ListItem
                                button={true}
                                hidden={false}
                                onClick={() => setOpenDelete(true)}
                            >
                                Delete Account
                            </ListItem>
                            <Dialog
                                open={openDelete}
                                title='Delete Account'
                                onClose={() => setOpenDelete(false)}
                            >
                                <h1>
                                    Delete Account?
                                    <p>
                                        All of your account information will be
                                        erased from Prytaneum. This action is
                                        irreversible. Please enter your password
                                        below twice to confirm.
                                    </p>
                                </h1>
                                <TextField
                                    id='Delete Account Password Entry One'
                                    required
                                    fullWidth
                                    variant='outlined'
                                    type='password'
                                    value=''
                                    onChange={(e) => {}}
                                    label='Please enter your password'
                                    spellCheck={false}
                                    autoComplete='off'
                                    autoCorrect='off'
                                    autoCapitalize='off'
                                />
                                <TextField
                                    id='Delete Account Password Entry Two'
                                    required
                                    fullWidth
                                    variant='outlined'
                                    type='password'
                                    value=''
                                    onChange={(e) => {}}
                                    label='Please enter your password again to DELETE your account'
                                    spellCheck={false}
                                    autoComplete='off'
                                    autoCorrect='off'
                                    autoCapitalize='off'
                                />
                                {/* TODO: If they enter their password correctly twice, redirects them to home page */}
                            </Dialog>
                        </Grid>
                    </Grid>
                ),
            },
        ],
    };

    var Information: Section = {
        title: 'About Prytaneum',
        sectionData: [
            {
                //image: 'https://i.imgur.com/3beQH5s.jpeg', // pull from db of users for pic
                title: '',
                subtitle: (
                    <Grid container spacing={2} alignContent='center'>
                        <Grid item xs={12}>
                            <ListItem
                                button={true}
                                hidden={false}
                                onClick={() => setOpenFeedback(true)}
                            >
                                Feedback
                            </ListItem>
                            <Dialog
                                open={openFeedback}
                                title='Feedback'
                                onClose={() => setOpenFeedback(false)}
                            >
                                <h1>Tell us how we are doing.</h1>
                            </Dialog>
                        </Grid>
                        <Grid item xs={12}>
                            <ListItem
                                button={true}
                                hidden={false}
                                onClick={() => setOpenAboutUs(true)}
                            >
                                About Us
                            </ListItem>
                            <Dialog
                                open={openAboutUs}
                                title='About Us'
                                onClose={() => setOpenAboutUs(false)}
                            >
                                <h1>This was made somehow by some people.</h1>
                            </Dialog>
                        </Grid>
                        <Grid item xs={12}>
                            <ListItem
                                button={true}
                                hidden={false}
                                onClick={() => setOpenPrivacyPolicy(true)}
                            >
                                Privacy Policy
                            </ListItem>
                            <Dialog
                                open={openPrivacyPolicy}
                                title='Privacy Policy'
                                onClose={() => setOpenPrivacyPolicy(false)}
                            >
                                <h1>Information is important.</h1>
                            </Dialog>
                        </Grid>
                        <Grid item xs={12}>
                            <ListItem
                                button={true}
                                hidden={false}
                                onClick={() => setOpenTOS(true)}
                            >
                                Terms of Service
                            </ListItem>
                            <Dialog
                                open={openTOS}
                                title='Terms of Service'
                                onClose={() => setOpenTOS(false)}
                            >
                                <h1>Pls no hurt us we no hurt you.</h1>
                            </Dialog>
                        </Grid>
                    </Grid>
                ),
            },
        ],
    };

    var test: Section[] = [
        {
            title: userProfile.title,
            sectionData: userProfile.sectionData,
        },
        {
            title: options.title,
            sectionData: options.sectionData,
        },
        {
            title: AccountSettings.title,
            sectionData: AccountSettings.sectionData,
        },
        {
            title: Information.title,
            sectionData: Information.sectionData,
        },
    ];

    return (
        <Container
            maxWidth='md'
            style={{
                width: '100%',
                height: '100%',
                overflowY: 'scroll',
            }}
        >
            <Paper className={classes.paper}>
                <MemoryRouter initialEntries={['/User Settings']}>
                    <Route path='/:title'>
                        <AppBar back />
                    </Route>
                </MemoryRouter>
                <SectionList sections={test} />
            </Paper>
        </Container>
    );
}