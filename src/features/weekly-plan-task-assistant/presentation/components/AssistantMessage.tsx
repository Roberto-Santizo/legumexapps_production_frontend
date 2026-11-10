import type { UIMessage } from "ai";
import { AssistantAudioList, AssistantMarkdown, AssistantToolTrail, getMessageAudios, getMessageText, getToolActivities } from "@/features/weekly-plan-task-assistant/weekly-plan-task-assistant";

type Props = {
    message: UIMessage;
};

export function AssistantMessage({ message }: Props) {
    const text = getMessageText(message);

    if (message.role === 'user') return (
        <div className="flex justify-end">
            <p className="max-w-[80%] rounded-2xl rounded-br-md bg-ink px-4 py-2.5 text-[14px] leading-relaxed whitespace-pre-wrap text-surface">
                {text}
            </p>
        </div>
    )

    const activities = getToolActivities(message);
    const audios = getMessageAudios(message, text);

    return (
        <article className="space-y-2">
            <AssistantToolTrail activities={activities} />
            <AssistantAudioList audios={audios} />
            {text && <AssistantMarkdown text={text} />}
        </article>
    )
}
