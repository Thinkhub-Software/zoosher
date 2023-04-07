import { Paper, Typography } from "@mui/material"
import { styleConstraints } from "../misc/styleConstraints"
import { MainColumn } from "./MainColumn"
import Link from "next/link"

export const Header = () => {

    return (
        <Paper
            elevation={0}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '0px'
            }}>
            <MainColumn
                sx={{
                    justifyContent: 'space-between',
                    flex: '1',
                    margin: styleConstraints.spacing.large,
                }}>

                <Link href="/">
                    <Typography
                        variant="h4">
                        Zoosher Movie Store
                    </Typography>
                </Link>
            </MainColumn>
        </Paper>
    )
}