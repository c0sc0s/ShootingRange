import { Grid } from "@mui/material";
import { useState, useMemo } from "react";
import { Tabs } from "@mui/material";
import { Tab } from "@mui/material";
import {
  BorderBox12,
  Decoration7,
  Decoration8,
} from "@jiaminghi/data-view-react";
import { FlagCircle } from "@mui/icons-material";
import clsx from "clsx";
import useAppStore from "../../store";
import ChallengeDialog from "./components/ChallengeDialog";

const ChallengeItem = ({ name, score, status, clickHandler, category }) => {
  return (
    <BorderBox12>
      <div
        onClick={clickHandler}
        className="w-40 gap-4 hover:cursor-pointer h-40 flex flex-col items-center py-4"
      >
        <Decoration7 style={{ width: "150px", height: "30px" }}>
          <span
            className={clsx(["font-custom", status ? "text-green-600" : ""])}
          >
            {name}
          </span>
        </Decoration7>
        {category && (
          <span
            className={clsx([
              "font-custom bg-blue-900 px-2 rounded-full",
              status ? "text-green-100 bg-green-500" : "",
            ])}
          >
            {category}
          </span>
        )}
        <div className="rounded-lg items-center text-center bg-black p-2">
          <FlagCircle className={clsx([status ? "text-green-400" : ""])} />
          <span className={clsx([status ? "text-green-400" : ""])}>
            {score}
          </span>
        </div>
      </div>
    </BorderBox12>
  );
};

const Challenges = () => {
  const { problems: selfChallenge } = useAppStore();

  const [modalOpen, setModalOpen] = useState(false);
  const [challengeInfo, setChallengeInfo] = useState({
    name: "正在加载",
    intro: "",
    hint: "",
    score: 0,
    status: false,
    content: "",
  });
  const [curCategory, setCurCategory] = useState(0);

  const categoryList = useMemo(() => {
    const category = [];
    const _set = new Set();
    category.push({
      tag: "全部",
      value: 0,
    });
    selfChallenge?.forEach((i) => {
      if (!_set.has(i.category)) {
        category.push({
          tag: i.category,
          value: i.category,
        });
        _set.add(i.category);
      }
    });
    return category;
  }, [selfChallenge]);

  const getChallenges = useMemo(() => {
    if (curCategory === 0) return selfChallenge;

    return selfChallenge.filter((i) => i.category === curCategory);
  }, [curCategory, selfChallenge]);

  return (
    <>
      <div>
        <div className="relative h-[50px] mt-5">
          <div className="absolute left-14 -top-2 font-custom text-[#3F96A5] text-[1.3rem]">
            CHALLENGES
          </div>
          <Decoration8 style={{ width: "300px", height: "50px" }} />
        </div>
        <Tabs
          textColor="secondary"
          indicatorColor="secondary"
          value={curCategory}
          onChange={(e, v) => {
            setCurCategory(v);
            setChallenges((pre) => {
              if (v === 0) {
                return selfChallenge;
              } else {
                return selfChallenge.filter((i) => {
                  return i.category == v;
                });
              }
            });
          }}
        >
          {categoryList?.map((i) => (
            <Tab key={i.value} value={i.value} label={i.tag}></Tab>
          ))}
        </Tabs>
        <div className="mt-4">
          <Grid
            container
            spacing={4}
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            {getChallenges?.map((item, index) => (
              <Grid item key={item.name + index}>
                <ChallengeItem
                  clickHandler={async () => {
                    setChallengeInfo(item);
                    setModalOpen(true);
                  }}
                  {...item}
                />
              </Grid>
            ))}
          </Grid>
        </div>
        <ChallengeDialog
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
          challengeInfo={challengeInfo}
        />
      </div>
    </>
  );
};

export default Challenges;
