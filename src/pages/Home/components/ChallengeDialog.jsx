import {
  BorderBox10,
  BorderBox8,
  Decoration11,
} from "@jiaminghi/data-view-react";
import {
  Alert,
  Chip,
  Dialog,
  DialogContent,
  IconButton,
  InputBase,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { EFlag } from "../../../static/enum";
import { submitFlag } from "../../../apis/home";
import { Flag } from "@mui/icons-material";
import ReactMarkdown from "react-markdown";
import { Check } from "@mui/icons-material";

const ChallengeDialog = ({ open, onClose, challengeInfo }) => {
  const [flagStatus, setFlagStatus] = useState(EFlag.None);
  const [flag, setFlag] = useState("");

  const submitHandler = async () => {
    if (flag === "") {
      setFlagStatus(-1);
      return;
    }

    setFlagStatus(0);

    try {
      const res = await submitFlag({
        name: challengeInfo.id,
        flag,
      });

      const code = Number(res.code);

      if (code !== 0) {
        setFlagStatus(1);
        return;
      }

      setFlagStatus(2);
    } catch (e) {
      setFlagStatus(1);
    }
  };

  const renderStatus = flagStatus !== EFlag.None && (
    <Alert
      severity={
        flagStatus === 2 ? "success" : flagStatus === 1 ? "error" : "info"
      }
      sx={{ mb: 2, flex: 1 }}
    >
      {flagStatus === 2 && "已提交正确flag!"}
      {flagStatus === 1 && "抱歉,flag错误!"}
      {flagStatus === 0 && "正在提交flag..."}
      {flagStatus === -1 && "请输入flag!"}
    </Alert>
  );

  const closeHandler = () => {
    onClose();
    setFlagStatus(EFlag.None);
    setFlag("");
  };

  return (
    <Dialog open={open} onClose={closeHandler}>
      <BorderBox10 className="z-1" title={challengeInfo.name}>
        <DialogContent>
          <div className="p-3 flex items-center flex-col gap-4 justify-center">
            {renderStatus}

            <Decoration11 style={{ width: "200px", height: "60px" }}>
              {challengeInfo.name}
            </Decoration11>

            <Chip
              sx={{
                height: "2.5rem",
                width: "8rem",
                color: "#8FEC8F",
              }}
              size="small"
              icon={<Flag color="#8FEC8F" />}
              label={challengeInfo.score}
            />

            <BorderBox8>
              <div className="p-4">
                <span
                  className="font-custom"
                  style={{
                    color: "lightgreen",
                    marginRight: ".3rem",
                  }}
                >
                  INTRO:
                </span>
                <div>{challengeInfo.intro}</div>

                <div className="mt-4">
                  <span
                    className="font-custom"
                    style={{
                      color: "lightgreen",
                      marginRight: ".3rem",
                    }}
                  >
                    HINT:
                  </span>
                  <ReactMarkdown>{challengeInfo.hint}</ReactMarkdown>
                </div>
              </div>
            </BorderBox8>
            <Paper
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 400,
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="请输入Flag"
                error={flagStatus === 1}
                id="name"
                type="email"
                fullWidth
                value={flag}
                onChange={(e) => {
                  setFlag(e.target.value);
                }}
              />
              <IconButton
                type="button"
                sx={{ p: "10px" }}
                loading={flagStatus === 0}
                onClick={submitHandler}
              >
                <Check />
              </IconButton>
            </Paper>
          </div>
        </DialogContent>
      </BorderBox10>
    </Dialog>
  );
};

export default ChallengeDialog;
