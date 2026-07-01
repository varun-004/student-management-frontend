import { Inbox } from "lucide-react";

import { cn } from "../../utils/cn";
import { Card, CardContent } from "./Card";

const EmptyState = ({
  icon: Icon = Inbox,
  title = "No data available",
  description,
  message,
  action,
  className,
}) => {
  const displayTitle = title || message;

  return (
    <Card className={cn("border-dashed", className)}>
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 ring-1 ring-slate-200">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>

        <h3 className="text-sm font-semibold text-slate-900">{displayTitle}</h3>

        {description && (
          <p className="mt-1.5 max-w-sm text-sm text-slate-500">{description}</p>
        )}

        {action && <div className="mt-6">{action}</div>}
      </CardContent>
    </Card>
  );
};

export default EmptyState;
