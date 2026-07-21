import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useController, type Control, type FieldValues, type Path, type RegisterOptions } from "react-hook-form";
import { UploadCloud } from "lucide-react";

type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  accept?: Record<string, string[]>;
  multiple?: boolean;
  validation?: RegisterOptions<T, Path<T>>;
};

export function FileFormField<T extends FieldValues>({ name, control, accept, multiple = false, validation }: Props<T>) {
  const { field, fieldState: { error } } = useController({ name, control, rules: validation });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      field.onChange(
        multiple ? acceptedFiles : acceptedFiles[0] ?? null
      );
    },
    [field, multiple]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple,
  });

  const files = multiple ? (field.value as File[]) || [] : field.value ? [field.value] : [];

  return (
    <div
      {...getRootProps()}
      className={`
        group relative overflow-hidden rounded-2xl border
        bg-white px-6 py-8
        transition-all duration-200
        flex flex-col items-center justify-center gap-3
        cursor-pointer
        ${isDragActive
          ? "border-slate-900 bg-slate-50 shadow-sm"
          : "border-slate-200 hover:border-slate-300 hover:shadow-sm"
        }
  `}
    >
      <input {...getInputProps()} />

      {files.length > 0 ? (
        <div className="flex w-full items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
            <UploadCloud className="h-5 w-5 text-slate-600" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-slate-900">
              {multiple
                ? `${files.length} archivos seleccionados`
                : files[0].name}
            </p>

            <p className="text-xs text-slate-500">
              Haz clic o arrastra para reemplazar
            </p>
          </div>
        </div>
      ) : (
        <>
          <div
            className={`
          flex h-12 w-12 items-center justify-center rounded-full
          transition-colors
          ${isDragActive
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
              }
        `}
          >
            <UploadCloud className="h-5 w-5" />
          </div>

          <div className="text-center">
            <p className="text-sm font-medium text-slate-900">
              {isDragActive
                ? "Suelta los archivos aquí"
                : "Subir archivo"}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Arrastra y suelta o haz clic para seleccionar
            </p>
          </div>
        </>
      )}

      {error && (
        <p className="text-red-400 text-xs">{error.message}</p>
      )}

    </div>
  );
}
