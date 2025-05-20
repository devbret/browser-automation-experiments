export type LinkStatusEntry = {
  link: string;
  status: number | "error";
  message?: string;
};

export type LinkStatusReport = LinkStatusEntry[];
