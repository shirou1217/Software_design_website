import {
    withStyles,
    Typography,
    Divider,
    Paper,
    Button,
    Grid,
} from '@material-ui/core'

import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

import CartItem from './CartItem';

const styles = theme => ({
    title: {
        minHeight: 50,
    },
    paper: {
        height: `calc(85vh - 210px)`,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    button: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
    },
    cartItemContainer: {
        height: `calc(85vh - 210px - 60px)`,
        overflowY: 'scroll',
    },
    totalText: {
        fontSize: 32,
        fontFamily: 'Roboto',
        margin: 'auto',
    },
    totalTextContainer: {
        minHeight: 60,
    }
});

class Cart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            total: 0,
        };
    }

    componentDidUpdate(prevProps) {
        // TODO-4: calculate total price
        // Calculate total price whenever cartList changes
        if (this.props.cartList !== prevProps.cartList) {
            const total = this.props.cartList.reduce((acc, item) => acc + (item.price * item.amount), 0);
            this.setState({ total });
        }

    }

    // TODO-7: confirm pay money
    handleConfirm = () => {
        // Assuming handleAdjustMoney returns a Promise
        this.props.handleAdjustMoney(-this.state.total)
            .then(response => {
                // Payment successful
                alert(response);
                // Clear the cart
                this.props.handleClearCart();
            })
            .catch(error => {
                // Payment failed
                alert(error);
            });
    }

    render() {
        const { classes, itemPrice, cartList, handleClearCart, handleDeleteCartItem, handleAdjustMoney } = this.props;

        return (
            <div>
                <Typography className={classes.title} variant="h4">
                    {"Shopping Cart"}
                </Typography>
                <Divider />
                <Paper className={classes.paper} elevation={3}>
                    <Grid className={classes.cartItemContainer}>
                        {/* TODO-3: use CartItem to show items in cart */}
                        {/* hint: map()... */}
                        {/* Render CartItem for each item in cartList */}
                         {cartList.map((item) => (
                            <CartItem
                                // key={idx}
                                // idx={idx}
                                amount={item.amount}
                                price={itemPrice[item.name]}
                                handleDeleteCartItem={handleDeleteCartItem}
                            />
                        ))}
                    </Grid>
                    <Divider />
                    <Grid className={classes.totalTextContainer} container>
                        <span className={classes.totalText}>{`Total: $${this.state.total}`}</span>
                    </Grid>
                </Paper>
                <Divider />
                <Grid container justifyContent="flex-end" wrap="nowrap">
                    {/* TODO-7: specify button event handler */}
                    {/* hint: handleConfirm */}
                   <Button
                        className={classes.button}
                        startIcon={<CheckIcon />}
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={this.handleConfirm} 
                    >
                        {"Confirm"}
                    </Button>
                    {/* TODO-5: specify button event handler */}
                    {/* hint: handleClearCart */}
                    <Button
                        className={classes.button}
                        startIcon={<ClearIcon />}
                        variant="contained"
                        color="secondary"
                        size="large"
                        onClick={handleClearCart}
                    >
                        {"Clear"}
                    </Button>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Cart);