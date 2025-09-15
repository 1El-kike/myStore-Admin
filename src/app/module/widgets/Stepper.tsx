import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import { FaCheck } from 'react-icons/fa';
import { SettingsIcon } from './iconSVG';
import { MdDeliveryDining, MdGroupAdd, MdOutlineSubway, MdVideoLabel } from 'react-icons/md';
import { Box, Paper, StepContent, Typography } from '@mui/material';
import { useMediaQuery } from 'react-responsive';

const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#784af4',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#784af4',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
        ...theme.applyStyles('dark', {
            borderColor: theme.palette.grey[800],
        }),
    },
}));

const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
    ({ theme }) => ({
        color: '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center',
        '& .QontoStepIcon-completedIcon': {
            color: '#784af4',
            zIndex: 1,
            fontSize: 18,
        },
        '& .QontoStepIcon-circle': {
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'currentColor',
        },
        ...theme.applyStyles('dark', {
            color: theme.palette.grey[700],
        }),
        variants: [
            {
                props: ({ ownerState }) => ownerState.active,
                style: {
                    color: '#784af4',
                },
            },
        ],
    }),
);

function QontoStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    return (
        <QontoStepIconRoot ownerState={{ active }} className={className}>
            {completed ? (
                <FaCheck className="QontoStepIcon-completedIcon" />
            ) : (
                <div className="QontoStepIcon-circle" />
            )}
        </QontoStepIconRoot>
    );
}

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1,
        ...theme.applyStyles('dark', {
            backgroundColor: theme.palette.grey[800],
        }),
    },
}));

const ColorlibStepIconRoot = styled('div')<{
    ownerState: { completed?: boolean; active?: boolean };
}>(({ theme }) => ({
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.applyStyles('dark', {
        backgroundColor: theme.palette.grey[700],
    }),
    variants: [
        {
            props: ({ ownerState }) => ownerState.active,
            style: {
                backgroundImage:
                    'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
                boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
            },
        },
        {
            props: ({ ownerState }) => ownerState.completed,
            style: {
                backgroundImage:
                    'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
            },
        },
    ],
}));

function ColorlibStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    const icons: { [index: string]: React.ReactElement<unknown> } = {
        1: <SettingsIcon />,
        2: <MdGroupAdd />,
        3: <MdVideoLabel />,
        4: <MdOutlineSubway />,
        5: <MdDeliveryDining />
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

const steps = ['Order Received', 'In Transit', 'On Shorting Center', 'On the Way', "Delivered"];
const steps2 = [
    {
        label: 'Order Received',
        description: 'An ad group contains one or more ads which target a shared set of keywords.',
    },
    {
        label: 'In Transit',
        description:
            'An ad group contains one or more ads which target a shared set of keywords.',
    },
    {
        label: 'On Shorting Center',
        description: 'An ad group contains one or more ads which target a shared set of keywords.',
    },
    {
        label: 'On the Way',
        description:
            'An ad group contains one or more ads which target a shared set of keywords.',
    },
    {
        label: 'Delivered',
        description:
            'An ad group contains one or more ads which target a shared set of keywords.',
    },
];

export default function CustomizedSteppers({ activeStep }: any) {

    const isMdScreen = useMediaQuery({ query: '(min-width: 768px)' });

    return (
        <>
            {
                isMdScreen ?
                    <Stack sx={{ width: '100%' }} spacing={4}>

                        <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                            {steps.map((label, index) => (
                                <Step key={label + index}>
                                    <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Stack>

                    :
                    <Box sx={{ maxWidth: 400, marginLeft: 3 }}>
                        <Stepper activeStep={activeStep} orientation="vertical">
                            {steps2.map((step, index) => (
                                <Step key={step.label + index}>
                                    <StepLabel
                                        optional={
                                            index === steps.length - 1 ? (
                                                <Typography variant="caption">Last step</Typography>
                                            ) : null
                                        }
                                    >
                                        {step.label}
                                    </StepLabel>
                                    <StepContent>
                                        <Typography>{step.description}</Typography>

                                    </StepContent>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === steps.length && (
                            <Paper square elevation={0} sx={{ p: 3 }}>
                                <Typography>All steps completed - you&apos;re finished</Typography>
                            </Paper>
                        )}
                    </Box>
            }
        </>
    )
}
