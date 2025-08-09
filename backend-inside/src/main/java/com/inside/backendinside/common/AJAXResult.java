package com.inside.backendinside.common;

import java.io.Serializable;

public class AJAXResult<T> implements Serializable {

    private static final long serialVersionUID = 1L;

    private int code;
    private String msg;
    private T data;

    public AJAXResult() {
    }

    public AJAXResult(int code, String msg, T data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }

    public static <T> AJAXResult<T> success(String msg, T data) {
        return new AJAXResult<>(200, msg, data);
    }

    public static <T> AJAXResult<T> success(T data) {
        return success("操作成功", data);
    }

    public static <T> AJAXResult<T> success(String msg) {
        return success(msg, null);
    }

    public static <T> AJAXResult<T> success() {
        return success("操作成功");
    }

    public static <T> AJAXResult<T> error(String msg, T data) {
        return new AJAXResult<>(500, msg, data);
    }

    public static <T> AJAXResult<T> error(String msg) {
        return error(msg, null);
    }

    public static <T> AJAXResult<T> error() {
        return error("操作失败");
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "AJAXResult{" +
               "code=" + code +
               ", msg='" + msg + '\'' +
               ", data=" + data +
               '}';
    }
}