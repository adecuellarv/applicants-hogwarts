export default {
    paginationContainer: {
        display: 'flex',
        listStyleType: 'none'
    },
    paginationItem: {
        padding: "0 12px",
        height: "32px",
        textAlign: "center",
        margin: "auto 4px",
        color: "rgba(0, 0, 0, 0.87)",
        display: "flex",
        boxSizing: "border-box",
        alignItems: "center",
        letterSpacing: "0.01071em",
        borderRadius: "16px",
        lineHeight: 1.43,
        fontSize: "13px",
        minWidth: "32px",
        "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)", cursor: "pointer" }
    },
    currentPage:{
        backgroundColor: 'rgba(0, 0, 0, 0.08)'
    }

}