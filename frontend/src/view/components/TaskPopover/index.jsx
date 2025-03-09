import { MenuItem, Popover } from "@mui/material";
import React from "react";

export const TaskPopover = ({
    anchorEl,
    open,
    task,
    handleClose,
    handleEdit,
    handleDelete,
  }) => {
    return (
      <Popover
        id={task._id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        onClick={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          style: {
            marginLeft: "0px",
            minWidth: "150px",
          },
        }}
      >
        <MenuItem onClick={() => handleEdit(task)}>Edit</MenuItem>
        <MenuItem onClick={() => handleDelete(task)}>Delete</MenuItem>
      </Popover>
    );
  };