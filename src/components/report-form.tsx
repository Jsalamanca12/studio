"use client";

import { useFormStatus } from "react-dom";
import { useActionState, useEffect, useRef } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { submitReport, type ReportState } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";

const initialState: ReportState = {
  message: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Submitting...
        </>
      ) : (
        "Submit Report"
      )}
    </Button>
  );
}

export function ReportForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState(submitReport, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      if (state.error) {
        toast({
          variant: "destructive",
          title: "Submission Error",
          description: state.message,
        });
      } else {
        // Reset the form on successful submission
        formRef.current?.reset();
      }
    }
  }, [state, toast]);

  return (
    <>
      {state.message && !state.error && (
        <Alert className="mb-6 border-accent/50 text-accent-foreground">
           <CheckCircle2 className="h-4 w-4 text-accent-foreground" />
          <AlertTitle>Report Submitted Successfully</AlertTitle>
          <AlertDescription>
            {state.message}
          </AlertDescription>
        </Alert>
      )}
      <form ref={formRef} action={formAction} className="space-y-6">
        <div className="grid w-full gap-2">
          <Label htmlFor="description" className="font-semibold">
            Please describe the incident in detail:
          </Label>
          <Textarea
            id="description"
            name="description"
            placeholder="For example: 'I witnessed a student being repeatedly pushed and called names in the hallway near the lockers.' The more detail you provide, the better we can assist."
            className="min-h-[150px] text-sm"
            required
            aria-describedby="description-helper"
          />
          <p id="description-helper" className="text-sm text-muted-foreground">
            Your report is anonymous and will be sent securely to school administrators.
          </p>
        </div>
        <SubmitButton />
      </form>
    </>
  );
}
