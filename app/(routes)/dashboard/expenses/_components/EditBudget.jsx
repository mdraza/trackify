"use client";

import { Button } from "@/components/ui/button";
import { PenBox } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import EmojiPicker from "emoji-picker-react";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { toast } from "sonner";
import { eq } from "drizzle-orm";

function EditBudget({ budgetInfo, refreshData }) {
  const [emojiIcon, setEmojiIcon] = useState();
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState();
  const [amount, setAmount] = useState();

  const { user } = useUser();

  useEffect(() => {
    if (budgetInfo) {
      setEmojiIcon(budgetInfo?.icon);
      setName(budgetInfo?.name);
      setAmount(budgetInfo?.amount);
    }
  }, [budgetInfo]);

  const onUpdateBudget = async () => {
    const result = await db
      .update(Budgets)
      .set({
        name: name,
        amount: amount,
        icon: emojiIcon,
      })
      .where(eq(Budgets.id, budgetInfo.id))
      .returning();

    if (result) {
      refreshData();
      toast.success("Budget updated successfully!", {
        className: "bg-green-100 text-green-900 shadow border border-green-300",
      });
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-indigo-700 hover:bg-indigo-800 cursor-pointer">
            <PenBox /> Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Budget</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <Button
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                  variant="outline"
                  className="cursor-pointer text-xl"
                  size="lg"
                >
                  {emojiIcon}
                </Button>
                <span className="absolute z-10">
                  <EmojiPicker
                    open={openEmojiPicker}
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji), setOpenEmojiPicker(false);
                    }}
                  />
                </span>
                <div className="mt-3">
                  <span className="text-black font-medium my-1">
                    Budget Name
                  </span>
                  <Input
                    defaultValue={budgetInfo?.name}
                    type="text"
                    placeholder="e.g Home Decore"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mt-3">
                  <span className="text-black font-medium my-1">
                    Budget Amount
                  </span>
                  <Input
                    defaultValue={budgetInfo?.amount}
                    type="number"
                    placeholder="e.g $5000"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                onClick={() => onUpdateBudget()}
                disabled={!(name && amount)}
                className="mt-5 w-full bg-indigo-700 hover:bg-indigo-800 cursor-pointer"
              >
                Update Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditBudget;
