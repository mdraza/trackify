"use client";

import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { toast } from "sonner";

function CreateBudget({ refreshData }) {
  const [emojiIcon, setEmojiIcon] = useState("🙂");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState();
  const [amount, setAmount] = useState();

  const { user } = useUser();

  const onCreateBudget = async () => {
    const result = await db
      .insert(Budgets)
      .values({
        name: name,
        amount: amount,
        createdBy: user?.primaryEmailAddress.emailAddress,
        icon: emojiIcon,
      })
      .returning({ insertedId: Budgets.id });
    console.log(result);

    if (result) {
      refreshData();
      toast.success("New Budget Created!", {
        className: "bg-green-100 text-green-900 shadow border border-green-300",
      });
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="bg-slate-100 p-10 flex items-center flex-col rounded-md border-2 border-dashed cursor-pointer hover:shadow-md">
            <h2 className="text-3xl">+</h2>
            <h2>Create New Budget</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
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
                onClick={() => onCreateBudget()}
                disabled={!(name && amount)}
                className="mt-5 w-full bg-indigo-700 hover:bg-indigo-800 cursor-pointer"
              >
                Create Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateBudget;
