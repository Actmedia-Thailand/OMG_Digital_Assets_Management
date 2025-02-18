"use client";
import { useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_TableHeadCellFilterContainer,
} from "material-react-table";
import {
  Paper,
  Stack, 
  useMediaQuery,
  Box,
  Button,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Chip,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { exportCsv } from "@/utils/exportCsv"; // นำเข้าฟังก์ชันจากไฟล์ที่แยกออกมา
import { exportPdf } from "@/utils/exportPdf"; // นำเข้าฟังก์ชัน export PDF ที่คุณสร้าง
import { exportExcel } from "@/utils/exportExcel";
import { MRT_ExpandAllButton } from "material-react-table";

const Table5_1 = ({ data, columns, views, setViews }) => {
  const [anchorElCsv, setAnchorElCsv] = useState(null); //ใช้ในการเปิดปิดเมนู
  const [anchorElPdf, setAnchorElPdf] = useState(null); //ใช้ในการเปิดปิดเมนู
  const [anchorElExcel, setAnchorElExcel] = useState(null); //ใช้ในการเปิดปิดเมนู

  const [groupedIds, setGroupedIds] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [viewName, setViewName] = useState("");
  const [groupName, setGroupName] = useState("");
  const [isShowFiltered, setIsShowFiltered] = useState(false);
  const [filteredData, setFilteredData] = useState(data); // เพิ่มตัวแปร state ของ filteredData

  //save view
  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [grouping, setGrouping] = useState([]);

  //reponsive
  const isMobile = useMediaQuery("(max-width: 1000px)");
  //ฟังชั่นเปิดขปิดเมนู
  const handleOpenMenu = (setter) => (event) => {
    setter(event.currentTarget);
  };

  const handleCloseMenu = (setter) => () => {
    setter(null);
  };

  // สร้าง table instance
  const table = useMaterialReactTable({
    columns,
    data: filteredData, // Using filteredData in the table
    ///Group---------------------------------------------------------------
    displayColumnDefOptions: {
      "mrt-row-expand": {
        Header: () => (
          <Stack direction="row" alignItems="center">
            <MRT_ExpandAllButton table={table} />
            <Box>Groups</Box>
          </Stack>
        ),
        GroupedCell: ({ row, table }) => {
          const { grouping } = table.getState();
          return row.getValue(grouping[grouping.length - 1]);
        },
        enableResizing: true,
        muiTableBodyCellProps: ({ row }) => ({
          sx: (theme) => ({
            color:
              row.depth === 0
                ? theme.palette.primary.main
                : row.depth === 1
                ? theme.palette.secondary.main
                : undefined,
          }),
        }),
        size: 200,
      },
    },
    enableGrouping: true,
    enableColumnResizing: true,
    groupedColumnMode: "remove",
    ///ค่าเริ่มต้น-------------------------------------------------------------------------
    initialState: {
      density: "compact",
      expanded: true, // ปิดการขยายกรุ๊ปเริ่มต้น
      pagination: { pageIndex: 0, pageSize: 30 },
    },
    ///
    enableRowSelection: true, //check box
    enableStickyHeader: true, // ล็อคหัว
    positionToolbarAlertBanner: "top", //แจ้งเตือนถ้าอยากให้ group ไปข้างล่างก็bottomซะ
    enableRowNumbers: true, // เลขแถว
    ///
    isMultiSortEvent: () => true,
    maxMultiSortColCount: 3,
    columnFilterDisplayMode: "popover",
    paginationDisplayMode: "pages",
    /// แก้ text กับ style
    muiFilterTextFieldProps: ({ column }) => ({
      label: `Filter by ${column.columnDef.header}`,
      sx: {
        "& .MuiInputLabel-root": {
          color: "",
        },
        "& .MuiInputBase-root": {
          borderColor: "",
        },
        "& .MuiInputBase-input": {
          color: "blue", // เปลี่ยนสีข้อความภายใน TextField เป็นฟ้า
        },
      },
    }),
    ///ตารางยืดดด-------------------------------------------------------------------------------------
    layoutMode: "grid", // ทำให้ตารางยืดตามจำนวนแถวใน page
    muiTableBodyProps: {
      sx: {
        overflow: "unset", // ยกเลิกการเลื่อนอัตโนมัติในแนวตั้ง
      },
    },
    muiTableContainerProps: {
      sx: {
        maxHeight: "unset", // ตั้งค่า maxHeight เป็น 'unset' เพื่อให้ตารางไม่จำกัดความสูง
      },
    },
    /// save view----------------------------------------------------------------------------
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onGroupingChange: setGrouping,
    state: {
      columnFilters,
      sorting,
      grouping,
    },
    /// แถบ toolbar-------------------------------------------------------------------------------------------
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          padding: "8px",
          flexWrap: "wrap",
        }}
      >
        {/* CSV Dropdown */}
        <Button
          aria-controls="export-csv-menu"
          aria-haspopup="true"
          onClick={handleOpenMenu(setAnchorElCsv)}
          startIcon={<FileDownloadIcon />}
        >
          Export CSV
        </Button>
        <Menu
          id="export-csv-menu"
          anchorEl={anchorElCsv}
          open={Boolean(anchorElCsv)}
          onClose={handleCloseMenu(setAnchorElCsv)}
        >
          <MenuItem
            onClick={() => {
              exportCsv(table.getPrePaginationRowModel().rows);
              handleCloseMenu(setAnchorElCsv)();
            }}
          >
            Export All Data
          </MenuItem>
          <MenuItem
            onClick={() => {
              exportCsv(table.getRowModel().rows);
              handleCloseMenu(setAnchorElCsv)();
            }}
          >
            Export Page Rows
          </MenuItem>
          <MenuItem
            onClick={() => {
              exportCsv(table.getPrePaginationRowModel().rows);
              handleCloseMenu(setAnchorElCsv)();
            }}
          >
            Export All Rows
          </MenuItem>
          <MenuItem
            onClick={() => {
              exportCsv(table.getSelectedRowModel().rows);
              handleCloseMenu(setAnchorElCsv)();
            }}
          >
            Export Selected Rows
          </MenuItem>
        </Menu>

        {/* PDF Dropdown */}
        <Button
          aria-controls="export-pdf-menu"
          aria-haspopup="true"
          onClick={handleOpenMenu(setAnchorElPdf)}
          startIcon={<FileDownloadIcon />}
        >
          Export PDF
        </Button>
        <Menu
          id="export-pdf-menu"
          anchorEl={anchorElPdf}
          open={Boolean(anchorElPdf)}
          onClose={handleCloseMenu(setAnchorElPdf)}
        >
          <MenuItem
            onClick={() => {
              const visibleColumns = table
                .getAllColumns()
                .filter((col) => col.getIsVisible());
              exportPdf(table.getPrePaginationRowModel().rows, visibleColumns);
              handleCloseMenu(setAnchorElPdf)();
            }}
          >
            Export All Data
          </MenuItem>
          <MenuItem
            onClick={() => {
              const visibleColumns = table
                .getAllColumns()
                .filter((col) => col.getIsVisible());
              exportPdf(table.getRowModel().rows, visibleColumns);
              handleCloseMenu(setAnchorElPdf)();
            }}
          >
            Export Page Rows
          </MenuItem>
          <MenuItem
            onClick={() => {
              const visibleColumns = table
                .getAllColumns()
                .filter((col) => col.getIsVisible());
              exportPdf(table.getPrePaginationRowModel().rows, visibleColumns);
              handleCloseMenu(setAnchorElPdf)();
            }}
          >
            Export All Rows
          </MenuItem>
          <MenuItem
            onClick={() => {
              const visibleColumns = table
                .getAllColumns()
                .filter((col) => col.getIsVisible());
              exportPdf(table.getSelectedRowModel().rows, visibleColumns);
              handleCloseMenu(setAnchorElPdf)();
            }}
          >
            Export Selected Rows
          </MenuItem>
        </Menu>

        {/* Excel Dropdown */}
        <Button
          aria-controls="export-excel-menu"
          aria-haspopup="true"
          onClick={handleOpenMenu(setAnchorElExcel)}
          startIcon={<FileDownloadIcon />}
        >
          Export Excel
        </Button>
        <Menu
          id="export-excel-menu"
          anchorEl={anchorElExcel}
          open={Boolean(anchorElExcel)}
          onClose={handleCloseMenu(setAnchorElExcel)}
        >
          <MenuItem
            onClick={() => {
              exportExcel(table.getPrePaginationRowModel().rows);
              handleCloseMenu(setAnchorElExcel)();
            }}
          >
            Export All Data
          </MenuItem>
          <MenuItem
            onClick={() => {
              exportExcel(table.getRowModel().rows);
              handleCloseMenu(setAnchorElExcel)();
            }}
          >
            Export Page Rows
          </MenuItem>
          <MenuItem
            onClick={() => {
              exportExcel(table.getPrePaginationRowModel().rows);
              handleCloseMenu(setAnchorElExcel)();
            }}
          >
            Export All Rows
          </MenuItem>
          <MenuItem
            onClick={() => {
              exportExcel(table.getSelectedRowModel().rows);
              handleCloseMenu(setAnchorElExcel)();
            }}
          >
            Export Selected Rows
          </MenuItem>
        </Menu>
      </Box>
    ),
  });

  ///ฟังชั่นเพิ่ม merge filter-------------------------------------------------------------------
  // เปิด-ปิด Dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setGroupName("");
  };

  // ฟังก์ชันบันทึก ID ของแถวที่ผ่านการกรองและรวมเข้าในกลุ่มใหม่
  const handleSaveFilteredIds = () => {
    const filteredIds = table.getRowModel().rows.map((row) => row.original.id);
    setGroupedIds((prevGroups) => ({
      ...prevGroups,
      [groupName]: filteredIds,
    }));
    handleCloseDialog();
  };

  // ฟังก์ชันกรองข้อมูลตามกลุ่ม ID ที่บันทึกไว้
  const handleFilterBySavedIds = () => {
    if (isShowFiltered) {
      setFilteredData(data); // แสดงข้อมูลทั้งหมด
    } else {
      const selectedIds = Object.values(groupedIds).flat();
      const uniqueIds = [...new Set(selectedIds)];
      setFilteredData(data.filter((item) => uniqueIds.includes(item.id)));
    }
    setIsShowFiltered(!isShowFiltered);
  };

  // ฟังก์ชันลบกลุ่มออกจาก groupedIds
  const handleDeleteGroup = (group) => {
    setGroupedIds((prevGroups) => {
      const newGroups = { ...prevGroups };
      delete newGroups[group];
      return newGroups;
    });
  };
  ///ฟังชั่น สำหรับสร้าง view ใหม่และเพิ่มใน views-----------------------------------------------------------------------
  // เปิด-ปิด Dialog
  const handleCloseViewDialog = () => {
    setIsViewDialogOpen(false);
    setViewName("");
  };

  const handleAddView = () => {
    const newView = {
      name: viewName,
      filters: [...columnFilters],
      sorting: [...sorting],
      group: [...grouping], // สามารถเพิ่ม group field อื่นๆ ที่ต้องการได้
    };

    // เพิ่ม view ใหม่เข้าไปใน views array และ log views หลังอัปเดต
    setViews((prevViews) => {
      const updatedViews = [...prevViews, newView];
      console.log(updatedViews); // แสดง views หลังจากถูกอัปเดต
      return updatedViews;
    });

    handleCloseViewDialog();
  };

  const handleButtonClick = (view) => {
    setColumnFilters(view.filters);
    setSorting(view.sorting);
    setGrouping(view.group);
  };



  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack direction={isMobile ? "column-reverse" : "row"} gap="8px">

        {/* View sidebar----------------------------------------------------------------------------- */}
        <div className="container-fluid" style={{ width: "1900px" }}>
          <div className="d-flex flex-column align-items-center gap-2 p-2">
            <button
              className="btn btn-primary"
              onClick={() => setIsViewDialogOpen(true)}
            >
              Add View
            </button>
          </div>
          {/* ------------------- Map ---------------------- */}
          <div className="d-flex flex-column align-items-center gap-2 p-3">
            {views.map((view, index) => (
              <button
                key={index}
                className="btn btn-secondary"
                onClick={() => handleButtonClick(view)}
              >
                {view.name}
              </button>
            ))}
          </div>
        </div>


        
        {/* -------------------- Dialog View -------------------- */}
        <Dialog open={isViewDialogOpen} onClose={handleCloseViewDialog}>
          <DialogTitle>Save Youre View</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter a name for this View:
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="View Name"
              type="text"
              fullWidth
              value={viewName}
              onChange={(e) => setViewName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseViewDialog}>Cancel</Button>
            <Button onClick={handleAddView} disabled={!viewName.trim()}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
        {/* Table หลัก -----------------------------------------------------------------*/}
        <MaterialReactTable table={table} />
        {/* Filter ด้านขวา ---------------------------------------------------------------*/}
        <Paper>
          <Stack p="8px" gap="8px">
            {/* ปุ่มและ Dialog สำหรับจัดการกลุ่ม----------------------------------- */}
            <Stack direction="column" spacing={2} alignItems="center">
              {/* กล่องบน: ปุ่ม 2 ปุ่ม */}
              <Box>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Button
                    variant="contained"
                    onClick={() => setIsDialogOpen(true)}
                  >
                    Merge Filtered
                  </Button>

                  <Button
                    variant="contained"
                    onClick={handleFilterBySavedIds}
                    sx={{ ml: 2 }}
                  >
                    {isShowFiltered ? "Show All" : "Show Merge"}
                  </Button>
                </Stack>
              </Box>

              {/* กล่องล่าง: Chips */}
              <Box>
                {Object.keys(groupedIds).map((group) => (
                  <Chip
                    key={group}
                    label={group}
                    onDelete={() => handleDeleteGroup(group)}
                    sx={{ borderRadius: "16px", m: 0.5 }} // เพิ่มช่องว่างเล็กน้อยรอบ ๆ ชิป
                  />
                ))}
              </Box>
            </Stack>
            {/* Dialog ให้กรอกชื่อกลุ่ม --------------------------------------------*/}
            <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
              <DialogTitle>Save Filtered IDs</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please enter a name for this group:
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Group Name"
                  type="text"
                  fullWidth
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button
                  onClick={handleSaveFilteredIds}
                  disabled={!groupName.trim()}
                >
                  Save
                </Button>
              </DialogActions>
            </Dialog>
            {/*  */}
            {/* filter sidebar --------------------------------------------------------------- */}
            {table
              .getLeafHeaders()
              .map(
                (header) =>
                  header.id !== "mrt-row-select" &&
                  header.id !== "mrt-row-numbers" && (
                    <MRT_TableHeadCellFilterContainer
                      key={header.id}
                      header={header}
                      table={table}
                    />
                  )
              )}
          </Stack>
        </Paper>
      </Stack>
    </LocalizationProvider>
  );
};

export default Table5_1;
