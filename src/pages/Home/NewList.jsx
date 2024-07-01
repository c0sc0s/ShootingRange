import FlagIcon from "@mui/icons-material/Flag";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { formateDate } from "../../utils/formate";
import { BorderBox10, BorderBox13 } from "@jiaminghi/data-view-react";
import { RestartAlt } from "@mui/icons-material";
import { Upload } from "@mui/icons-material";
import { Lock } from "@mui/icons-material";
import { Download } from "@mui/icons-material";
import useAppStore from "../../store";
import { useState } from "react";
import { changePwd, restart } from "../../apis/home";
import { toast } from "sonner";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const NewsItem = (item) => {
  return (
    <Box
      key={item.update_at + item.team_name + item.challenge_name}
      sx={{
        mb: 3,
      }}
    >
      <Box>
        <Typography
          variant="caption"
          sx={{
            color: "#c1c1c1",
          }}
        >
          {formateDate(item.update_at)}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            mr: 1,
            color: item.is_success ? "#B0FF20" : "red",
          }}
        >
          {item.team_name}
        </Typography>
        <FlagIcon
          sx={{
            color: item.is_success ? "B0FF79" : "red",
          }}
        />
        <Typography
          sx={{
            ml: 1,
            color: item.is_success ? "#B0FF20" : "red",
          }}
        >
          {item.challenge_name}
        </Typography>
      </Box>
    </Box>
  );
};

const NewList = () => {
  const { news, upLoadWp, restartContainer } = useAppStore();
  const [pwdModalOpen, setPwdModalOpen] = useState(false);
  const [pwd, setPwd] = useState({
    newPwd: "",
    repeatPwd: "",
  });
  const [validate, setValidate] = useState({
    status: true,
    msg: "",
  });

  const handleFileChange = (event) => {
    // handleUpload(event.target.files);
    handleUpload(event.target.files[0]);
  };

  const handleUpload = async (file) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/team/uploadwp", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          console.log("文件上传成功");
        } else {
          console.error("文件上传失败");
        }
      } catch (error) {
        console.error("发生错误:", error);
      }
    }
  };

  const pwdModalCloseHandler = () => {
    setPwdModalOpen(false);
    setPwd("");
  };

  const validatePwd = () => {
    // 1. 不少于 6 位
    if (pwd.newPwd.length < 6) {
      return {
        status: false,
        msg: "密码长度至少为 6 位",
      };
    }
    // 2. 相同
    if (pwd.newPwd !== pwd.repeatPwd) {
      return {
        status: false,
        msg: "两次密码输入不一致",
      };
    }
    return {
      status: true,
      msg: "",
    };
  };

  const pwdConfirmHandler = async () => {
    const res = validatePwd();
    setValidate(res);
    if (res.status) {
      toast.promise(changePwd(pwd.newPwd), {
        loading: "Loading...",
        success: () => {
          return `修改成功`;
        },
        error: "Error",
      });
      pwdModalCloseHandler();
    } else {
      setValidate(res);
    }
  };

  const restartHandler = async () => {
    toast.promise(restart(), {
      loading: "Loading...",
      success: () => {
        return `Restart Success`;
      },
      error: "Error",
    });
  };

  return (
    <>
      <div>
        <BorderBox13>
          <div className="grid grid-cols-2 gap-2 p-4 mb-8">
            <Button
              disabled={!restartContainer}
              startIcon={<RestartAlt />}
              variant="text"
              color="success"
              onClick={restartHandler}
            >
              <span>重启环境</span>
            </Button>

            <Button
              component="label"
              role={undefined}
              variant="text"
              tabIndex={-1}
              disabled={!upLoadWp}
              startIcon={<Upload />}
              color="success"
            >
              WP上传
              <VisuallyHiddenInput type="file" onChange={handleFileChange} />
            </Button>
            <Button
              startIcon={<Lock />}
              onClick={() => setPwdModalOpen(true)}
              variant="text"
              color="success"
            >
              修改密码
            </Button>
            <Button
              variant="text"
              href="/source/wp.md"
              target="_blank"
              color="success"
            >
              <Download /> 模版下载
            </Button>
          </div>
        </BorderBox13>
        <BorderBox10>
          <div className="p-10">
            {news?.map((item) => (
              <NewsItem
                key={
                  item.update_at +
                  item.team_name +
                  item.challenge_name +
                  Math.random() +
                  "news"
                }
                {...item}
              />
            ))}
          </div>
        </BorderBox10>
      </div>
      <Dialog open={pwdModalOpen} onClose={pwdModalCloseHandler}>
        <DialogTitle>修改密码</DialogTitle>
        <div className="flex flex-col gap-4 p-8">
          <TextField
            type="password"
            error={!validate.status}
            value={pwd.newPwd}
            helperText={validate.msg}
            onChange={(e) =>
              setPwd((pwd) => ({ ...pwd, newPwd: e.target.value }))
            }
            label="请输入新密码"
          />
          <TextField
            error={!validate.status}
            type="password"
            value={pwd.repeatPwd}
            onChange={(e) =>
              setPwd((pwd) => ({ ...pwd, repeatPwd: e.target.value }))
            }
            label="请重复新密码"
            helperText={validate.msg}
          />
        </div>
        <DialogActions>
          <Button>取消</Button>
          <Button onClick={pwdConfirmHandler}>确认</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NewList;
