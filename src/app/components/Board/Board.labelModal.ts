import { createSelector } from "@riadh-adrani/recursive-web/css";
import { CenteredRow, Column, Row, Spacer } from "@riadh-adrani/recursive-web/html";
import { ComponentStyleSheet } from "@riadh-adrani/recursive-web/lib";
import { generateContrastSafeColor, isBlank } from "@riadh-adrani/utility-js";
import { setState } from "../../..";
import useBoard from "../../hooks/useBoard";
import Board from "../../models/Board";
import Label from "../../models/Label";
import { radius } from "../../style";
import { StandardButton } from "../Button";
import Dialog from "../Dialog/Dialog";
import Icon from "../Icon/Icon";
import ColorPicker from "../Input/ColorPicker";
import { FlatInput } from "../Input/Input";
import { SubTitle } from "../Title";

export default () => {
  const {
    showLabelsModal,
    setShowLabelModal,
    board: _board,
    updateBoardLabel,
    getLabel,
    updateBoardRemoveLabel,
    updateBoardAddLabel,
  } = useBoard();

  const [newLabel, setNewLabel] = setState("new-label", { text: "", color: "#ffffff" });

  const updateNewLabelText = (text: string) => {
    setNewLabel({ ...newLabel, text });
  };

  const updateNewLabelColor = (color: string) => {
    setNewLabel({ ...newLabel, color });
  };

  const addLabel = () => {
    if (isBlank(newLabel.text)) return;

    updateNewLabelText("");
    updateBoardAddLabel(new Label({ ...newLabel }));
  };

  const board = _board as Board;

  const hide = () => setShowLabelModal(false);

  const updateText = (id: string, text: string) => {
    updateBoardLabel(id, { ...getLabel(id), text });
  };

  const updateColor = (id: string, color: string) => {
    updateBoardLabel(id, { ...getLabel(id), color });
  };

  const remove = (id: string) => {
    updateBoardRemoveLabel(id);
  };

  return Dialog({
    show: showLabelsModal,
    onBackClicked: hide,
    onEscapePressed: hide,
    children: Column({
      style: {
        normal: { width: "400px", padding: ["10px"] },
      },
      children: [
        Row({
          style: {
            normal: {
              justifyContent: "space-between",
            },
          },
          children: [
            SubTitle("Labels"),
            StandardButton({
              text: Icon("fa-xmark"),
              onClick: hide,
            }),
          ],
        }),
        Spacer({ height: "20px" }),
        Column({
          children: board.labels.map((label) =>
            CenteredRow({
              style: {
                normal: {
                  justifyContent: "space-between",
                  marginBottom: "5px",
                  background: label.color,
                  color: generateContrastSafeColor(label.color),
                  padding: ["5px", "10px"],
                  borderRadius: radius,
                },
                [" input" as keyof ComponentStyleSheet]: createSelector({ fontWeight: "600" }),
              },
              children: [
                FlatInput({
                  value: label.text,
                  placeholder: "Label name...",
                  size: "medium",
                  color: generateContrastSafeColor(label.color),
                  onInput: (e) => updateText(label.id, e.currentTarget.value),
                }),
                Spacer({ width: "10px" }),
                CenteredRow({
                  children: [
                    ColorPicker({
                      value: label.color,
                      onChange: (e) => updateColor(label.id, e.currentTarget.value),
                    }),
                    Spacer({ width: "10px" }),
                    StandardButton({
                      text: Icon("fa-trash"),
                      flat: true,
                      onClick: () => remove(label.id),
                    }),
                  ],
                }),
              ],
            })
          ),
        }),
        Spacer({ height: "10px" }),
        CenteredRow({
          style: {
            normal: {
              justifyContent: "space-between",
              marginBottom: "5px",
              padding: ["5px", "10px"],
              borderRadius: radius,
            },
            [" input" as keyof ComponentStyleSheet]: createSelector({ fontWeight: "600" }),
          },
          children: [
            FlatInput({
              value: newLabel.text,
              placeholder: "Label name...",
              size: "medium",
              onInput: (e) => updateNewLabelText(e.currentTarget.value),
            }),
            Spacer({ width: "10px" }),
            CenteredRow({
              children: [
                ColorPicker({
                  value: newLabel.color,
                  onChange: (e) => updateNewLabelColor(e.currentTarget.value),
                }),
                Spacer({ width: "10px" }),
                StandardButton({
                  text: Icon("fa-plus"),
                  flat: true,
                  onClick: addLabel,
                }),
              ],
            }),
          ],
        }),
        Spacer({ height: "10px" }),
        StandardButton({ text: "Close", onClick: hide }),
      ],
    }),
  });
};
