import React, { ReactNode } from "react";
import { CustomContentProps, SnackbarContent, SnackbarProvider } from "notistack";  
import { NOTISTACK_VARIANT } from "../utils/globalTypes";
import { NotificationError, NotificationInfo, NotificationSuccess } from "./NotificationItems";

interface NotificationWrapperProps {
    children: ReactNode;
}

interface SuccessProps extends CustomContentProps {
    type: NOTISTACK_VARIANT;
}

const CustomSuccessNotification = React.forwardRef<HTMLDivElement, SuccessProps>((props, ref) => {
    const { id, message, type, persist: _, ...other } = props;

    return (
        <SnackbarContent ref={ref} role="alert" {...other}>
            <NotificationSuccess message={message} />
        </SnackbarContent>
    );
});

const CustomErrorNotification = React.forwardRef<HTMLDivElement, SuccessProps>((props, ref) => {
    const { id, message, type, ...other } = props;

    return (
        <SnackbarContent ref={ref} role="alert" {...other}>
            <NotificationError message={message} />
        </SnackbarContent>
    );
});

const CustomInfoNotification = React.forwardRef<HTMLDivElement, SuccessProps>((props, ref) => {
    const { id, message, type, ...other } = props;

    return (
        <SnackbarContent ref={ref} role="alert" {...other}>
            <NotificationInfo message={message} />
        </SnackbarContent>
    );
});

export function NotificationProvider(props: NotificationWrapperProps) {
    const { children } = props;

    return (
        <SnackbarProvider
            autoHideDuration={3000}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            Components={{
                success: CustomSuccessNotification,
                error: CustomErrorNotification,
                info: CustomInfoNotification,
            }}
        >
            {children}
        </SnackbarProvider>
    );
}
