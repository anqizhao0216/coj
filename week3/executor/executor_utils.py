import docker
import os
import shutil
import uuid
from docker.errors import *

client = docker.from_env()

IMAGE_NAME = 'anqi531/demo'
CURRENT_DIR = os.path.dirname(os.path.realpath(__file__))
TEMP_BUILD_DIR = '%s/tmp' % CURRENT_DIR

SOURCE_FILE_NAMES = {
	'java': 'Example.java',
	'python': 'example.py'
}

BINARY_NAMES = {
	'java': 'Example',
	'python': 'example.py'
}

BUILD_COMMANDS = {
	'java': 'javac',
	'python': 'python'
}

EXECUTE_COMMANDS = {
	'java': 'java',
	'python': 'python'
}


def load_image():
	try:
		client.images.get(IMAGE_NAME)
	except ImageNotFound:
		print 'image not found locally, loading from docker hub...'
		client.images.pull(IMAGE_NAME)
	except APIError:
		print 'image not found locally. docker hub is not accessible'
		return
	print 'Image: [%s] loaded' % IMAGE_NAME

def build_and_run(code, language):
	result = {'build':None, 'run':None, 'error':None}
	source_file_parent_dir_name = uuid.uuid4()
	source_file_host_dir = '%s/%s' % (TEMP_BUILD_DIR, source_file_parent_dir_name)
	source_file_guest_dir = '/test/%s' %(source_file_parent_dir_name)

	make_dir(source_file_host_dir)

	with open('%s/%s' % (source_file_host_dir, SOURCE_FILE_NAMES[language]), 'w') as source_file:
		source_file.write(code)

	try:
		client.containers.run(
			image=IMAGE_NAME,
			command='%s %s' % (BUILD_COMMANDS[language], SOURCE_FILE_NAMES[language]),
			volumes={source_file_host_dir: {'bind': source_file_guest_dir, 'mode': 'rw'}},
			working_dir=source_file_guest_dir
		)
		print 'Source built'
		result['build'] = 'OK'
	except ContainerError as e:
		print 'Build failed'
		result['build'] = e.stderr
		shutil.rmtree(source_file_host_dir)
		return result

	try:
		log = client.containers.run(
			image=IMAGE_NAME,
			command='%s %s' % (EXECUTE_COMMANDS[language], BINARY_NAMES[language]),
			volumes={source_file_host_dir: {'bind': source_file_guest_dir, 'mode': 'rw'}},
			working_dir=source_file_guest_dir
		)
		print 'Executed'
		result['run'] = log
	except ContainerError as e:
		print 'Execution failed'
		result['run'] = e.stderr
		shutil.rmtree(source_file_host_dir)
		return result

	shutil.rmtree(source_file_host_dir)
	return result

def make_dir(dir):
	try:
		os.mkdir(dir)
		print 'temp build directory [%s] created' % dir
	except OSError:
		print 'temp build directory [%s] exists' % dir