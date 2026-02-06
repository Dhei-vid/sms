"use client";

import Link from "next/link";
import Image from "next/image";

interface QuizHeaderProps {
  quizTitle: string;
  userName?: string;
  userId?: string;
  userAvatar?: string;
}

export function QuizHeader({
  quizTitle,
  userName = "Tunde Oluwole",
  userId = "oluwole.m178023",
  userAvatar,
}: QuizHeaderProps) {
  return (
    <div className="bg-gray-800 text-white px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2">
          <Image
            className="w-7 h-7"
            src={"/logo/sms_icon_blue.png"}
            alt={"logo"}
            width={40}
            height={40}
          />
          <span className="font-bold text-lg">PH-SMS</span>
        </Link>
      </div>
      <div className="flex-1 text-center">
        <h1 className="text-lg font-semibold">{quizTitle}</h1>
      </div>
      <div className="flex items-center gap-3">
        {userAvatar ? (
          <img
            src={userAvatar}
            alt={userName}
            className="h-10 w-10 rounded-full"
          />
        ) : (
          <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-medium">
            {userName.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="flex flex-col">
          <span className="text-sm font-medium">{userName}</span>
          <span className="text-xs text-gray-300">{userId}</span>
        </div>
      </div>
    </div>
  );
}
