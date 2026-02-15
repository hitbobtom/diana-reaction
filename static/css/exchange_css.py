import os
import re
import shutil
import sys

up_dir_path = os.path.abspath(os.path.join(os.getcwd(), ""))
pathPrefix = up_dir_path

file_extensions = [".css"]


def to_gbk(text):
    return text.encode('gbk', 'ignore').decode('gbk')


def read_css(folder_path):
    css_list = []
    for filename in os.listdir(folder_path):
        if any(file_extension in filename for file_extension in file_extensions):
            if 'spring - ' in filename:
                css_list.append(filename)
    return css_list


def print_css_list(css_list):
    print('\n')
    for i in range(0, len(css_list)):
        css_filename = css_list[i]
        print('  ' + str(i + 1) + ' ---------- ' + css_filename)
    print('\n')


def exchange_one_css(css_list, folder_path, num):
    # 1.获取文件名
    css_filename = css_list[num - 1]
    print(css_filename)

    # 2. 删除原来的spring.css文件
    ori_css_path = os.path.join(folder_path, 'spring.css')
    if os.path.exists(ori_css_path):
        os.remove(ori_css_path)

    # 3. 复制新的spring.css文件
    src_path = os.path.join(folder_path, css_filename)
    if os.path.exists(src_path):
        dst_path = ori_css_path
        shutil.copy(src_path, dst_path)
        print(f"Copyd {to_gbk(src_path)} to {to_gbk(dst_path)}")


def input_num(max_num):
    number = 0

    while 1:
        num = input('请输入指定的css文件序号：')
        try:
            number = int(num)  # 或者使用 float(s) 如果你预期是浮点数
        except ValueError:
            print("转换失败，字符串不是一个有效的数字")

        if max_num + 1 > number > 0:
            print("输入的序号正确：" + str(number))
            break

    return number


def exchange_css(folder_path):
    # 1.读取css列表
    css_list = read_css(folder_path)
    if len(css_list) < 1:
        return
    css_list.sort()

    # 2.输入指定的文件序号
    print_css_list(css_list)
    num = input_num(len(css_list))

    # 3.更换css
    exchange_one_css(css_list, folder_path, num)


if __name__ == "__main__":
    folder_path = sys.argv[1]
    if folder_path == '':
        folder_path = input('请输入包含小说文件的文件夹完整路径：')
    # folder_path = input('请输入包含小说文件的文件夹完整路径：')

    exchange_css(folder_path)
